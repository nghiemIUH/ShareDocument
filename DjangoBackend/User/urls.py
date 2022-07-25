from django.urls import path
from . import views

app_name = 'user'
urlpatterns = [
    path('get-user-info/', views.getUserInfo),
    path('register/', views.register),
    path('send-mail-password/', views.getTokenResetPassword),
    path('reset-password/', views.resetPassword)
]
