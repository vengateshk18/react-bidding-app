from django.contrib import admin

from .models import Profile,Category,Listing,WatchList
# Register your models here.
admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Listing)
admin.site.register(WatchList)