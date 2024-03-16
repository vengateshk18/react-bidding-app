# Generated by Django 5.0.3 on 2024-03-13 06:15

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bidding',
            old_name='list',
            new_name='listing',
        ),
        migrations.RenameField(
            model_name='listing',
            old_name='cetegory',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='listing',
            old_name='descripton',
            new_name='description',
        ),
        migrations.AlterField(
            model_name='bidding',
            name='time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='commends',
            name='time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='listing',
            name='start_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='watchlist',
            name='date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
