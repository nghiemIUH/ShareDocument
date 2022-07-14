from django.urls import path
from . import views
app_name = 'document'
urlpatterns = [
    path('get-all/', views.GetAllDocumentView.as_view()),
    path('get-category/', views.getAllCategory),
    path('get-document/<str:category>/', views.GetDocumentView.as_view()),
    path('detail/<slug:slug>/', views.getDocumentDeatil),
    path('search/', views.SearchDocument.as_view())
]
