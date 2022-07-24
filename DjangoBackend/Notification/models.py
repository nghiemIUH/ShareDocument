from django.db import models
import uuid
from django.contrib.auth import get_user_model
from django.utils import timezone


# Create your models here.
class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='user')
    otherUser = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name='other_user')
    url = models.TextField()
    description = models.TextField()
    read = models.BooleanField(default=False)
    seen = models.BooleanField(default=False)
    noteType = models.CharField(max_length=255, default='post')
    createAt = models.DateTimeField(default=timezone.now)
