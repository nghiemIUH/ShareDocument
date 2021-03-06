# Generated by Django 4.0.5 on 2022-07-23 06:16

import django.contrib.postgres.indexes
import django.contrib.postgres.search
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0007_alter_post_auth'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(null=True),
        ),
        migrations.AddIndex(
            model_name='post',
            index=django.contrib.postgres.indexes.GinIndex(fields=['search_vector'], name='Blog_post_search__47a33e_gin'),
        ),
    ]
