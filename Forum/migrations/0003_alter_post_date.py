# Generated by Django 4.0.5 on 2022-07-18 12:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Forum', '0002_alter_like_post_alter_post_date_alter_postmedia_post'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]