from django.db import models
from django.contrib.auth import get_user_model
import uuid
import os
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.utils import timezone
# Create your models here.


class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    auth = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='forum_post')
    date = models.DateTimeField(default=timezone.now)
    content = models.TextField()
    accept = models.BooleanField(default=False)
    acceptAt = models.DateTimeField(default=timezone.now)

    def __str__(self) -> str:
        return self.content


@receiver(pre_delete, sender=Post)
def auto_delete_file(sender, instance, **kwargs):
    media = PostMedia.objects.filter(post=instance)
    for m in media:
        os.remove(m.file.path)


class PostMedia(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to='forum/%Y/%m/%d')


class Like(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    auth = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    auth = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)


# class Notification(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     user = models.ForeignKey(
#         get_user_model(), on_delete=models.CASCADE, related_name='user')
#     otherUser = models.ForeignKey(
#         get_user_model(), on_delete=models.CASCADE, related_name='other_user')
#     url = models.TextField()
#     description = models.TextField()
#     read = models.BooleanField(default=False)
#     noteType = models.CharField(max_length=255, default='post')
#     createAt = models.DateTimeField(default=timezone.now)
