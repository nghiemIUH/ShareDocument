from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('forum/note/<str:username>/',
         consumers.CommentConsumer.as_asgi()),
]
