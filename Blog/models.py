import datetime
from django.db import models
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField
from django.urls import reverse
from django.utils.text import slugify
# Create your models here.

User = get_user_model()


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.name


class Category(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.title


class Post(models.Model):
    introduce = models.TextField(default='Introduce')
    auth = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(blank=True)
    date = models.DateField(default=datetime.datetime.now)
    slug = models.SlugField(default='slug', blank=True, max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tag = models.ManyToManyField(Tag)
    view = models.IntegerField(default=0)
    review_image = models.FileField(
        default='Facebook_Embed.png', upload_to='review_post_img')
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
