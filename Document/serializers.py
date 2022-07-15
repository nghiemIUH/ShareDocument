from rest_framework import serializers
from . import models


class CategorySerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class DocumentSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Document
        fields = ['id', 'review_img', 'slug', 'title', 'date', 'view']


class DocumentDetailSerialize(serializers.ModelSerializer):
    class Meta:
        model = models.Document
        fields = '__all__'
