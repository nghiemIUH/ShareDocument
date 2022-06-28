from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
# Register your models here.


class CustomAdmin(UserAdmin):
    fieldsets = (
        (_('User information'), {"fields": ("username",
         "password", 'email', 'fullName', 'balance')}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ("username", "email", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("username", "email")
    ordering = ("username",)


admin.site.register(models.CustomUser, CustomAdmin)
