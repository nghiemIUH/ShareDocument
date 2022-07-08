from rest_framework.decorators import api_view, permission_classes
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.response import Response
from rest_framework import status
from . import models
from rest_framework.permissions import AllowAny
from . import serializers
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from django.db.models import Count


@api_view(['GET'])
@permission_classes([AllowAny])
def getPopularPost(request):
    posts = models.Post.objects.all().order_by('view')[:5]
    posts_se = serializers.PopularPostSerialize(posts, many=True)
    return Response(data=posts_se.data, status=status.HTTP_200_OK)


# error
@api_view(['GET'])
@permission_classes([AllowAny])
def getAllTag(request):
    tags = models.Tag.objects.all()
    tags_se = serializers.TagSerialize(tags, many=True)
    return Response(data=tags_se.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def getAllCategory(request):
    data = []
    categories = models.Category.objects.all()
    for cate in categories:
        count = models.Post.objects.filter(category=cate).count()
        data.append({'title': cate.title, 'count': count})
    return Response(data=data, status=status.HTTP_200_OK)


class PostView(APIView, LimitOffsetPagination):
    permission_classes = [AllowAny]

    def get(self, request):
        posts = models.Post.objects.all()
        results = self.paginate_queryset(posts, request, view=self)
        serializer = serializers.PostSerialize(results, many=True)
        return self.get_paginated_response(serializer.data)
