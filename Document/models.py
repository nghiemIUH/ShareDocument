import datetime
from django.db import models
from django.utils.text import slugify

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.title


class Document(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    date = models.DateField(default=datetime.datetime.now)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='document_file/%Y/%m/%d')
    review_img = models.FileField(
        upload_to='document/%Y/%m/%d/review', default='logo1.png')
    view = models.IntegerField(default=0)
    slug = models.SlugField(default='slug', blank=True, max_length=255)

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs) -> None:
        self.slug = slugify(self.title)+'-' + \
            datetime.datetime.strftime(self.date, '%d-%m-%Y')
        return super().save(*args, **kwargs)
