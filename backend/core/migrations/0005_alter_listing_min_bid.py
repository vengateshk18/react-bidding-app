# Generated by Django 5.0.3 on 2024-03-17 10:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_profile_profile_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='min_bid',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
