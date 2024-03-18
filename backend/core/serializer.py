from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile,Category,Listing,WatchList

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    # Include user information in profile serialization
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Profile
        fields = ['phoneNumber', 'address', 'profile_img', 'username', 'email']

class UserSerializer(serializers.ModelSerializer):
    profile_img = serializers.ImageField(write_only=True, required=False)  # Make profile_img optional
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile', 'profile_img']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        profile_img = validated_data.pop('profile_img', None)
        
        # Create the user without the profile image
        user = User.objects.create_user(**validated_data)
        
        # Create the profile
        profile_instance = Profile.objects.create(user=user, **profile_data)
        
        # Update profile image if provided
        if profile_img:
            profile_instance.profile_img = profile_img
            profile_instance.save()
        
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile_img = validated_data.pop('profile_img', None)
        
        # Update user fields
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        
        # Save user changes
        instance.save()
        
        # Update profile fields
        if hasattr(instance, 'profile'):
            profile = instance.profile
            profile.phoneNumber = profile_data.get('phoneNumber', profile.phoneNumber)
            profile.address = profile_data.get('address', profile.address)
            profile.save()
        
        # Update profile image if provided
        if profile_img:
            profile.profile_img = profile_img
            profile.save()
        
        return instance
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields=['category']
class ListingSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.user.username')
    user_email = serializers.ReadOnlyField(source='user.user.email')
    category = serializers.SlugRelatedField(slug_field='category', queryset=Category.objects.all())
    class Meta:
        model = Listing
        fields = ['id', 'user_username', 'user_email', 'category', 'product_title', 'description', 'price', 'list_img', 'min_bid', 'start_date', 'end_date', 'is_active']

class WatchListSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.user.username')
    product_title = serializers.ReadOnlyField(source='listing.product_title')
    description = serializers.ReadOnlyField(source='listing.description')
    price = serializers.ReadOnlyField(source='listing.price')
    list_img_url = serializers.SerializerMethodField()
    start_date = serializers.ReadOnlyField(source='listing.start_date')
    end_date = serializers.ReadOnlyField(source='listing.end_date')
    is_active = serializers.ReadOnlyField(source='listing.is_active')
    category = serializers.SlugRelatedField(slug_field='category', source='listing.category', queryset=Category.objects.all())

    class Meta:
        model = WatchList
        fields = ['id', 'user', 'product_title', 'description', 'price', 'list_img_url', 'start_date', 'end_date', 'is_active', 'category']

    def get_list_img_url(self, obj):
        if obj.listing.list_img:
            return obj.listing.list_img.url
        return None



