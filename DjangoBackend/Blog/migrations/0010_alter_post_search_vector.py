# Generated by Django 4.0.5 on 2022-07-23 07:11

import django.contrib.postgres.search
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0009_alter_post_search_vector'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(default=django.contrib.postgres.search.SearchVector('content', config='vietnamese'), null=True),
        ),
    ]