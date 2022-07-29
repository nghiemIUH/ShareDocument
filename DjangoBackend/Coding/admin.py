from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ['name', ]


@admin.register(models.Course)
class CourseAdmin(admin.ModelAdmin):
    class TestCaseAdminInline(admin.StackedInline):
        model = models.TestCase
        extra = 0
    inlines = [TestCaseAdminInline]
