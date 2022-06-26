import datetime
from django.db import models
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.

User = get_user_model()


class Introduce(models.Model):
    content = models.TextField(blank=False)

    def __str__(self) -> str:
        n = len(self.content.split())
        return ' '.join(self.content.split()[:n//3])+'...'


class Post(models.Model):
    auth = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(blank=True)
    content = RichTextUploadingField()
    date = models.DateField(default=datetime.datetime.now)

    def __str__(self) -> str:
        return self.title
