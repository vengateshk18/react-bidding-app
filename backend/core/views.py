from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from django.contrib.auth.views import LoginView
from .serializer import UserSerializer, ProfileSerializer
from .models import Profile
from django.contrib.auth.models import User
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'ok'}, status=201)
        return Response(serializer.errors, status=400)
    else:
        return Response({'error': 'Only POST requests are allowed'}, status=405)

@api_view(['POST'])
def login_view(request):
    #print(username,password)
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        print(username,password)
        if username and password:
            user = authenticate(username=username, password=password)
            if user is not None and user.is_active:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({'message': 'Login successful', 'token': token.key}, status=200)
            else:
                return Response({'error': 'Invalid username or password'}, status=400)
        else:
            return Response({'error': 'Username and password are required'}, status=400)
    else:
        return Response({'error': 'Only POST requests are allowed'}, status=405)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def userdetails(request):
    #print(request.user)
    profile=Profile.objects.get(user=request.user)
    serializer=ProfileSerializer(profile)
    return Response(serializer.data)


