import datetime
from django.db import models
from django.contrib.auth import get_user_model

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
    num_download = models.IntegerField(default=0)
    price = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.title


class DocumentUser(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    document = models.ManyToManyField(Document)
