from django.contrib import admin
from . import models

# Register your models here.


class PostMediaAdminInline(admin.StackedInline):
    model = models.PostMedia


class CommentAdminInline(admin.StackedInline):
    model = models.Comment


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    inlines = [PostMediaAdminInline, CommentAdminInline]


admin.site.register(models.Like)
admin.site.register(models.Comment)
