from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Category)


@admin.register(models.Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['category', 'title']
    list_per_page = 10
    search_fields = ['category', 'title']
