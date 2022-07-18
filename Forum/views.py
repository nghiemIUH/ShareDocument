# from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from . import models, serializers


class PaginationCustomPost(LimitOffsetPagination):
    default_limit = 10


class PostView(APIView, PaginationCustomPost):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def get(self, request):
        posts = models.Post.objects.all().order_by('-date')
        posts = self.paginate_queryset(posts, request, view=self)
        posts_se = serializers.PostSerialize(posts, many=True)
        return self.get_paginated_response(posts_se.data)

    def post(self, request):
        try:
            user = request.user
            content = request.data['content']
            post = models.Post.objects.create(auth=user, content=content)
            for i in request.FILES.getlist('images'):
                models.PostMedia.objects.create(post=post, file=i)
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
