from django.urls import path
from . import views
from django.contrib.sitemaps.views import sitemap
from Blog.sitemaps import PostSitemap

sitemaps = {
    "posts": PostSitemap,
}

app_name = 'blog'

urlpatterns = [
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
    path('get-popular/', views.getPopularPost),
    path('get-all-tag/', views.getAllTag),
    path('get-all-category/', views.getAllCategory),
    path('get-post/', views.PostView.as_view()),
    path('post-detail/<slug:slug>/', views.getDetail),
    path('category/<str:category_name>/', views.getPostCategory)

]
