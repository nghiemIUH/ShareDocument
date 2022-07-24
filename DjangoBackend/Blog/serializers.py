from attr import field
from rest_framework import serializers
from . import models
from User.serializers import UserSerializer


class TagSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'


class CategorySerialize(serializers.Serializer):
    count = serializers.IntegerField()
    category__title = serializers.CharField()


class PopularPostSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ['id', 'title', 'slug', 'review_image', 'date']


class PostSerialize(serializers.ModelSerializer):
    auth = UserSerializer()

    class Meta:
        model = models.Post
        fields = ['id', 'introduce', 'title', 'auth', 'slug',
                  'review_image', 'date']


class PostDetailSerialize(serializers.ModelSerializer):
    auth = UserSerializer()
    tag = TagSerialize(read_only=True, many=True)

    class Meta:
        model = models.Post
        fields = ['id', 'introduce', 'title', 'auth', 'slug',
                  'review_image', 'date', 'content', 'tag']
