from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin
# Register your models here.
admin.site.register(models.CustomUser, UserAdmin)
