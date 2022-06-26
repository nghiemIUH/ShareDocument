import datetime
from django.db import models

# Create your models here.


class Document(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField(default=datetime.datetime.now)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='document_file/%Y/%m/%d')
    num_download = models.IntegerField(default=0)
    price = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.title
