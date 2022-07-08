from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

# Create your views here.

User = get_user_model()


@api_view(['GET'])
@authentication_classes([OAuth2Authentication])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user = request.user
    user_se = UserSerializer(user)
    return Response(data=user_se.data, status=status.HTTP_200_OK)
