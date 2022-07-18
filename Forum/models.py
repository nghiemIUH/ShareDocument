from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime
import os
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.utils import timezone
# Create your models here.


class Post(models.Model):
    auth = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='forum_post')
    date = models.DateTimeField(default=timezone.now)
    content = models.TextField()

    def __str__(self) -> str:
        return self.content


@receiver(pre_delete, sender=Post)
def auto_delete_file(sender, instance, **kwargs):
    media = PostMedia.objects.filter(post=instance)
    for m in media:
        os.remove(m.file.path)


class PostMedia(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to='forum/%Y/%m/%d')


class Like(models.Model):
    auth = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Comment(models.Model):
    auth = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateField(default=datetime.now)
