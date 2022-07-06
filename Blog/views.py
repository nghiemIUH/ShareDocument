from django.shortcuts import render
from . models import Post, Introduce, Tag
from django.views.decorators.cache import cache_page
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.conf import settings
import json

# Create your views here.

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)


@cache_page(CACHE_TTL)
def index(request):
    posts = Post.objects.all().order_by('-date')
    return render(request, 'home.html', {'post': posts})


def post_detail(request, slug):
    post = Post.objects.get(slug=slug)
    return render(request, 'post.html', {'post': post})


def get_base_data(request):
    return {
        'posts': Post.objects.all().order_by('-date')[:5],
        'tags': Tag.objects.all(),
        'intro': Introduce.objects.all()[0]
    }


def get_post_with_tag(request, tag):
    tag = Tag.objects.get(name=tag)
    post = tag.post_set.all()
    return render(request, 'home.html', {'post': post})


def about(request):
    return render(request, 'about.html')
