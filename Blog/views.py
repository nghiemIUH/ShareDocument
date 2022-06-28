from unicodedata import name
from django.shortcuts import render
from . models import Post, Introduce, Tag
# Create your views here.


def index(request):
    post = Post.objects.all().order_by('-date')
    return render(request, 'home.html', {'post': post})


def post_detail(request, _id):
    post = Post.objects.get(pk=_id)
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
