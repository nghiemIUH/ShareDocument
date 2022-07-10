import os
from django.dispatch import receiver
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


@receiver(models.signals.post_delete, sender=Post)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.review_image:
        if os.path.isfile(instance.review_image.path) and not instance.review_image.path.endswith('Facebook_Embed.png'):
            os.remove(instance.review_image.path)


@receiver(models.signals.pre_save, sender=Post)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False
    try:
        old_file = Post.objects.get(pk=instance.pk).review_image
    except Post.DoesNotExist:
        return False
    new_file = instance.review_image
    if not old_file == new_file:
        if os.path.isfile(old_file.path) and not instance.review_image.path.endswith('Facebook_Embed.png'):
            os.remove(old_file.path)
