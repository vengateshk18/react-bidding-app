from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from pytz import timezone as tz
import uuid

User = get_user_model()

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=200,null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    profile_img = models.ImageField(upload_to="profile_images", default="blank_profile_pic.png",null=True,blank=True)
    def __str__(self) -> str:
        return f"{self.user}"

class Category(models.Model):
    category = models.CharField(max_length=200)

    def __str__(self) -> str:
        return f"{self.category}"

class Listing(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_title = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField()
    list_img=models.ImageField(upload_to="list_images",default='blank_profile_pic.png',null=True,blank=True)
    min_bid = models.IntegerField(null=True,blank=True)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f"{self.user.user.username} listed {self.product_title}"

class Bidding(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    bid_user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    price = models.IntegerField()
    time = models.DateTimeField(default=timezone.now)

class Commends(models.Model):
    commend = models.TextField()
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    list = models.ForeignKey(Listing, on_delete=models.CASCADE)
    time = models.DateTimeField(default=timezone.now)

class WatchList(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
