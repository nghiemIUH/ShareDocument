from django.urls import path
from . import views
urlpatterns = [
    path('get-note/', views.getNotification),
    path('seen/', views.seenNotification),
    path('read/', views.readNotification)
]
