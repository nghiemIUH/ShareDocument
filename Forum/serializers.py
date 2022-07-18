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


class CommentSerialize(serializers.ModelSerializer):
    auth = UserSerializer()

    class Meta:
        model = models.Comment
        fields = '__all__'


class LikeSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Like
        fields = '__all__'
