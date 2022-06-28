from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.Category)
admin.site.register(models.Document)


class DocumenUsertInline(admin.TabularInline):
    model = models.DocumentUser.document.through


class DocumentUserAdmin(admin.ModelAdmin):
    inlines = [DocumenUsertInline]
    exclude = ('document',)


admin.site.register(models.DocumentUser, DocumentUserAdmin)
