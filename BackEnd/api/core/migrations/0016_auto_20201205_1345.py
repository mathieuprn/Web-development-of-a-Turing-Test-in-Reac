# Generated by Django 3.1.4 on 2020-12-05 13:45

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20201203_1045'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagesar',
            name='image',
            field=models.ImageField(upload_to=core.models.recipe_image_file_path, verbose_name='image'),
        ),
    ]
