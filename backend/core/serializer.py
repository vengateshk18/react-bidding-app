from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

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
