# Generated by Django 4.0.5 on 2022-06-26 01:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_customuser_balance'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='full_name',
            new_name='fullName',
        ),
    ]
