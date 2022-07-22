# from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from . import models, serializers
from django.utils import timezone


class PaginationCustomPost(LimitOffsetPagination):
    default_limit = 10


class PaginationCustomComment(LimitOffsetPagination):
    default_limit = 5


class PostView(APIView, PaginationCustomPost):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def get(self, request):
        posts = models.Post.objects.filter(
            accept=request.GET['type'] == 'accepted').order_by('-date')
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


class CommentView(APIView, PaginationCustomComment):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def get(self, request):
        post_id = request.GET['post_id']
        post = models.Post.objects.get(pk=post_id)
        comments = models.Comment.objects.filter(
            post=post).order_by('-date')
        comments = self.paginate_queryset(comments, request, view=self)
        comments_se = serializers.CommentSerialize(comments, many=True)
        return self.get_paginated_response(reversed(comments_se.data))

    def post(self, request):
        try:
            auth = request.user
            content = request.data['content']
            post_id = request.data['post_id']
            post = models.Post.objects.get(pk=post_id)
            comment = models.Comment.objects.create(
                auth=auth, content=content, post=post)
            comment_se = serializers.CommentSerialize(comment)
            return Response(data=comment_se.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LikeView(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def get(self, request):
        post = models.Post.objects.get(pk=request.GET['post_id'])
        likes = post.like_set.count()
        try:
            models.Like.objects.get(auth=request.user, post=post)
            return Response(data={"isLike": True, 'numLike': likes}, status=status.HTTP_200_OK)
        except:
            return Response(data={"isLike": False, 'numLike': likes}, status=status.HTTP_200_OK)

    def post(self, request):
        post = models.Post.objects.get(pk=request.data['post_id'])
        likes = post.like_set.count()
        try:
            like = models.Like.objects.get(auth=request.user, post=post)
            like.delete()
            return Response(data={"isLike": False, 'numLike': likes-1}, status=status.HTTP_200_OK)
        except:
            models.Like.objects.create(auth=request.user, post=post)
            return Response(data={"isLike": True, 'numLike': likes+1}, status=status.HTTP_200_OK)


class GetPostIDView(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def get(self, request):
        try:
            post = models.Post.objects.get(pk=request.GET['id'])
            post_se = serializers.PostSerialize(post)
            return Response(data=post_se.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AcceptPost(APIView):
    permission_classes = [IsAdminUser, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def put(self, request):
        try:
            models.Post.objects.filter(pk=request.data['id']).update(
                accept=True, acceptAt=timezone.now())
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class DeletePost(APIView):
    permission_classes = [IsAdminUser, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def put(self, request):
        try:
            models.Post.objects.filter(pk=request.data['id']).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class GetNumComment(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    authentication_classes = [OAuth2Authentication]

    def get(self, request):
        post = models.Post.objects.get(pk=request.GET['id'])
        comments = post.comment_set.count()
        return Response(data=comments, status=status.HTTP_200_OK)
