# Generated by Django 4.0.5 on 2022-06-30 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0016_alter_post_tag'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='slug',
            field=models.SlugField(default=''),
        ),
    ]