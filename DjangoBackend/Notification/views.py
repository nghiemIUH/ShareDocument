from . import models, serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.views import APIView
from rest_framework.decorators import authentication_classes, permission_classes, api_view
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated, TokenHasReadWriteScope])
@authentication_classes([OAuth2Authentication])
def getNotification(request):
    try:
        note = models.Notification.objects.filter(
            user=request.user).order_by('-createAt')
        note_se = serializers.NotificationSerialize(note[:10], many=True)
        return Response(data=note_se.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated, TokenHasReadWriteScope])
@authentication_classes([OAuth2Authentication])
def seenNotification(request):
    try:
        models.Notification.objects.all().update(seen=True)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, TokenHasReadWriteScope])
@authentication_classes([OAuth2Authentication])
def readNotification(request):
    try:
        models.Notification.objects.filter(
            pk=request.data['id']).update(read=True)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
