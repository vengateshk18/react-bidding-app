# Generated by Django 5.0.3 on 2024-03-17 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_listing_min_bid'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='list_img',
            field=models.ImageField(blank=True, default='blank_profile_pic.png', null=True, upload_to='list_images'),
        ),
        migrations.AlterField(
            model_name='listing',
            name='end_date',
            field=models.DateField(),
        ),
    ]
