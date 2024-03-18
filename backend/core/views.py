from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from django.contrib.auth.views import LoginView
from .serializer import UserSerializer, ProfileSerializer,CategorySerializer,ListingSerializer
from .models import Profile,Category,Listing,WatchList
from django.contrib.auth.models import User
from datetime import datetime
import pytz
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProducts(request):
    try:
        profile = Profile.objects.get(user=request.user)
        category_name = request.POST.get('category')  # Assuming category is sent in request data
        category = Category.objects.get(category=category_name)
        product_title = request.POST.get('product_title')
        description = request.POST.get('description')
        price = request.POST.get('price')
        end_date_string = request.POST.get('end_date')
        end_date = datetime.strptime(end_date_string, '%Y-%m-%d').date()
        list = Listing.objects.create(
            user=profile,
            category=category,
            product_title=product_title,
            description=description,
            price=price,
            end_date=end_date,
            list_img=request.FILES.get('productimg',None)
        )
        list.save()
        return Response({'message': 'Product added successfully.'}, status=200)
    except Profile.DoesNotExist:
        print("profile")
        return Response({'message': 'Profile does not exist.'}, status=400)
    except Category.DoesNotExist:
        print("category")
        return Response({'message': 'Category does not exist.'}, status=400)
    except Exception as e:
        print(e)
        return Response({'message': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categories(request):
    categories=Category.objects.all()
    serializer=CategorySerializer(categories,many=True)
    return Response(serializer.data, status=200)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bid_lists(request):
    lists=Listing.objects.all()
    serializer=ListingSerializer(lists,many=True)
    return Response(serializer.data,status=200)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_watchlist(request):
    try:
        profile=Profile.objects.get(user=request.user)
        id=request.POST.get('id','')
        list=Listing.objects.get(id=id)
        if not WatchList.objects.filter(user=profile,listing=list):
            list=WatchList.objects.create(user=profile,listing=list)
            return Response({'message':'watchList Created successfully'},status=200)
        else:
            return Response({'message':'your watchlist has this list already'},status=400)
    except Exception as e:
        print(e+"->")
        return Response("there is some problem",status=400)