from django.db import models
from uuid import uuid4
from django.utils import timezone
from ckeditor_uploader.fields import RichTextUploadingField


# Create your models here.

class Language(models.Model):
    id = models.UUIDField(default=uuid4,
                          primary_key=True, blank=False, editable=False)
    name = models.CharField(max_length=500, unique=True)

    def __str__(self) -> str:
        return self.name


class Course(models.Model):
    id = models.UUIDField(default=uuid4,
                          primary_key=True, blank=False, editable=False)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    createAt = models.DateTimeField(default=timezone.now)
    question = RichTextUploadingField()


class TestCase(models.Model):
    id = models.UUIDField(default=uuid4,
                          primary_key=True, blank=False, editable=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    inputs = models.TextField()
    outputs = models.TextField()
