from django.urls import path
from . import views

app_name = 'user'
urlpatterns = [
    path('logout/', views.handleLogout, name='logout'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.Register.as_view(), name='register'),
]
