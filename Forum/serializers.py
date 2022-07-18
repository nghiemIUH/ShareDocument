from rest_framework import serializers
from User.serializers import UserSerializer
from . import models


class MediaSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.PostMedia
        fields = ['file']


class PostSerialize(serializers.ModelSerializer):
    media = MediaSerialize(many=True, source='postmedia_set')
    auth = UserSerializer()

    class Meta:
        model = models.Post
        fields = '__all__'
