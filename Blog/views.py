from django.shortcuts import render
from . models import Post, Introduce
# Create your views here.


def index(request):
    post = Post.objects.all()
    intro = Introduce.objects.all()[0]
    return render(request, 'home.html', {'post': post, 'intro': intro})


def post_detail(request, _id):
    post = Post.objects.get(pk=_id)
    return render(request, 'post.html', {'post': post})
