# Generated by Django 5.0.3 on 2024-03-14 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_profile_phonenumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_img',
            field=models.ImageField(blank=True, default='blank_profile_pic.png', null=True, upload_to='profile_images'),
        ),
    ]
