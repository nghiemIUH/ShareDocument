from rest_framework import serializers
from User.serializers import UserSerializer
from . import models


class NotificationSerialize(serializers.ModelSerializer):
    user = UserSerializer()
    otherUser = UserSerializer()

    class Meta:
        model = models.Notification
        fields = '__all__'
