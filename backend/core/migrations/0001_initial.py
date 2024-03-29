# Generated by Django 5.0.3 on 2024-03-13 06:13

import datetime
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phoneNumber', models.IntegerField(blank=True, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('profile_img', models.ImageField(default='blank_profile_pic.png', upload_to='profile_images')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('product_title', models.CharField(max_length=250)),
                ('descripton', models.TextField(blank=True, null=True)),
                ('price', models.IntegerField()),
                ('min_bid', models.IntegerField()),
                ('start_date', models.DateTimeField(default=datetime.datetime(2024, 3, 13, 6, 13, 36, 881514, tzinfo=datetime.timezone.utc))),
                ('end_date', models.DateTimeField()),
                ('is_active', models.BooleanField(default=True)),
                ('cetegory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.category')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Commends',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('commend', models.TextField()),
                ('time', models.DateTimeField(default=datetime.datetime(2024, 3, 13, 6, 13, 36, 882515, tzinfo=datetime.timezone.utc))),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.listing')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Bidding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField()),
                ('time', models.DateTimeField(default=datetime.datetime(2024, 3, 13, 6, 13, 36, 882515, tzinfo=datetime.timezone.utc))),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.listing')),
                ('bid_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.profile')),
            ],
        ),
        migrations.CreateModel(
            name='WatchList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.datetime(2024, 3, 13, 6, 13, 36, 882515, tzinfo=datetime.timezone.utc))),
                ('listing', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.listing')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.profile')),
            ],
        ),
    ]
