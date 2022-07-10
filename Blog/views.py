from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from . import models
from rest_framework.permissions import AllowAny
from . import serializers
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from django.views.decorators.cache import cache_page
from django.conf import settings

CACHE_TTL = settings.CACHE_TTL


@api_view(['GET'])
@cache_page(CACHE_TTL)
@permission_classes([AllowAny])
def getPopularPost(request):
    posts = models.Post.objects.filter(is_delete=False).order_by('view')[:5]
    posts_se = serializers.PopularPostSerialize(posts, many=True)
    return Response(data=posts_se.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
@cache_page(CACHE_TTL)
def getAllTag(request):
    tags = models.Tag.objects.all()
    tags_se = serializers.TagSerialize(tags, many=True)
    return Response(data=tags_se.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
@cache_page(CACHE_TTL)
def getAllCategory(request):
    data = []
    categories = models.Category.objects.all()
    for cate in categories:
        count = models.Post.objects.filter(
            category=cate, is_delete=False).count()
        data.append({'title': cate.title, 'count': count})
    return Response(data=data, status=status.HTTP_200_OK)


class PostView(APIView, LimitOffsetPagination):
    permission_classes = [AllowAny]

    def get(self, request):
        posts = models.Post.objects.filter(is_delete=False)
        results = self.paginate_queryset(posts, request, view=self)
        serializer = serializers.PostSerialize(results, many=True)
        return self.get_paginated_response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def getDetail(request, slug):
    try:
        post = models.Post.objects.get(slug=slug)
        post_se = serializers.PostDetailSerialize(post)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(data=post_se.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def getPostCategory(request, category_name):
    try:
        category = models.Category.objects.get(title=category_name)
        posts = models.Post.objects.filter(category=category, is_delete=False)
        posts_se = serializers.PostSerialize(posts, many=True)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(data=posts_se.data, status=status.HTTP_200_OK)
