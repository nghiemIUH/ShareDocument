import threading
from django.core.mail import EmailMessage, send_mail
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import FullUserSerializer
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, smart_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
# Create your views here.

User = get_user_model()


@api_view(['GET'])
@authentication_classes([OAuth2Authentication])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user = request.user
    user_se = FullUserSerializer(user)
    return Response(data=user_se.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    user = User.objects.create_user(
        username=data['username'],
        password=data['password'],
        fullName=data['fullName'],
        email=data['email']
    )
    try:
        avatar = request.FILES['avatar']
        user.avatar = avatar
        user.save()
    except:
        pass
    return Response(status=status.HTTP_200_OK)


class EmailThread(threading.Thread):

    def __init__(self, email, message):
        self.email = email
        self.message = message
        threading.Thread.__init__(self)

    def run(self):
        self.email.send(self.message)


class Util:
    @staticmethod
    def send_email(message):
        email = SendGridAPIClient(os.environ.get('EMAIL_HOST_PASSWORD'))
        EmailThread(email, message).start()


@api_view(['POST'])
@permission_classes([AllowAny])
def getTokenResetPassword(request):
    email = request.data.get('email', '')
    try:
        user = User.objects.get(email=email)
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)
        fe_site = os.environ.get('FRONTEND_URL')
        url = f'{fe_site}/reset-password/{uidb64}/{token}'
        message = Mail(
            from_email='support.vndev@vndev.info',
            to_emails=email,
            subject='Reset your passsword',
            html_content=f'Vui lòng click vào link này để đặt lại mật khẩu: {url}'
        )
        try:
            Util.send_email(message)
        except Exception as e:
            print(e.message)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def resetPassword(request):
    token = request.data.get('token', '')
    uidb64 = request.data.get('uidb64', '')
    password = request.data.get('password', '')
    try:
        id = smart_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=id)
        if PasswordResetTokenGenerator().check_token(user, token):
            user.set_password(password)
            user.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
