from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='home'),
    path('post/detail/<int:_id>/', views.post_detail, name='post_detail')
]
