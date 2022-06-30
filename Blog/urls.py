from django.urls import path
from . import views
from django.contrib.sitemaps.views import sitemap

from Blog.sitemaps import PostSitemap

sitemaps = {
    "posts": PostSitemap,
}

app_name = 'blog'

urlpatterns = [
    path('', views.index, name='home'),
    path('post/detail/<str:slug>/', views.post_detail, name='post_detail'),
    path('post/tag/<str:tag>', views.get_post_with_tag, name='search_tag'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap')
]
