import datetime
from django.db import models
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField
from django.urls import reverse
from django.utils.text import slugify
# Create your models here.

User = get_user_model()


class Introduce(models.Model):
    content = models.TextField(blank=False)

    def __str__(self) -> str:
        n = len(self.content.split())
        return ' '.join(self.content.split()[:n//3])+'...'


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.name


class Post(models.Model):
    auth = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(blank=True)
    date = models.DateField(default=datetime.datetime.now)
    slug = models.SlugField(default='slug', blank=True)
    tag = models.ManyToManyField(Tag)
    is_delete = models.BooleanField(default=False)
    content = RichTextUploadingField()

    def save(self, *args, **kwargs) -> None:
        self.slug = slugify(self.title)+'-' + \
            datetime.datetime.strftime(self.date, '%d-%m-%Y')
        return super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.is_delete = True
        return super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title

    def get_absolute_url(self):
        return reverse("blog:post_detail", kwargs={"slug": self.slug})
