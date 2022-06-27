from django.contrib import admin
from .models import Post, Introduce, Tag
# Register your models here.
admin.site.register(Introduce)


class TagInline(admin.TabularInline):
    model = Post.tag.through


class TagAdmin(admin.ModelAdmin):
    inlines = [TagInline]


class PostAdmin(admin.ModelAdmin):
    inlines = [TagInline]
    exclude = ('tag',)


admin.site.register(Tag, TagAdmin)
admin.site.register(Post, PostAdmin)
