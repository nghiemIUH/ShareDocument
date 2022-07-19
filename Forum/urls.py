from django.urls import path
from . import views
urlpatterns = [
    path('post/', views.PostView.as_view()),
    path('comment/', views.CommentView.as_view()),
    path('like/', views.LikeView.as_view()),
    path('get-post/', views.GetPostIDView.as_view()),
    path('get-note/', views.GetNotificationView.as_view())
]
