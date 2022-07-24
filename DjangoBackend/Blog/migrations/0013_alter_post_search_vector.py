# Generated by Django 4.0.5 on 2022-07-23 07:37

import django.contrib.postgres.search
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0012_alter_post_search_vector'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(blank=True, editable=False, null=True),
        ),
    ]