from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.index, name='home'),
    path('post/detail/<int:_id>/', views.post_detail, name='post_detail'),
    path('post/tag/<str:tag>', views.get_post_with_tag, name='search_tag')
]
