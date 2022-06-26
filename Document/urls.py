from django.urls import path
from . import views
app_name = 'document'
urlpatterns = [
    path('', views.DocumentView.as_view(), name='document'),
    path('buy/<int:id>', views.buyDocument, name='buy_document')
]
