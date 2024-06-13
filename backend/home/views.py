from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers  import CustomerSerializer,ProfileSerializer
from .models import Usermodelss,Userprofile
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from rest_framework.parsers import MultiPartParser
from django.contrib.auth.hashers import check_password
import json
from django.core.exceptions import ObjectDoesNotExist


# Create your views here.
class RegisterationApi(APIView):
    def post(self, request):
        print(request.data)
        serializer = CustomerSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        
        print(f"emailfail{email}")
        try:
            user = Usermodelss.objects.get(email=email)
        except Usermodelss.DoesNotExist:
            return Response({'error': 'User not found or invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        
        if not check_password(password, user.password):
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if user.is_superuser == False:

        
            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': CustomerSerializer(user).data
            })
        else:
            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'admin': CustomerSerializer(user).data
            })

    

class ProfileDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            profile = Usermodelss.objects.get(id=request.user.id)
            print(request.user)
        except Usermodelss.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CustomerSerializer(profile)
        return Response(serializer.data)


class Profileview(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        print(request)
        try:
            profileimg = Userprofile.objects.get(user_id=request.user.id)
            print(request.user.id)
        except Userprofile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profileimg)
        return Response(serializer.data)


class ProfileImageUpload(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        print(user_id)
        try:
            user = Usermodelss.objects.get(id = user_id)
        except Usermodelss.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        
        image_file = request.FILES.get('image')

        if not image_file:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        
        try:
            userprofile = Userprofile.objects.get(user_id=user_id)
            created = False
        except Userprofile.DoesNotExist:
            userprofile = None
            created = True

        
        if userprofile:
            userprofile.profile_image = image_file
            userprofile.save()
        
        else:
            userprofile = Userprofile.objects.create(user_id=user_id, profile_image=image_file)
        

        # serializer = ProfileSerializer(user, data={'profile_image': image_file}, partial=True)
        # print(request.data)

        # if serializer.is_valid():
        #     print(serializer.validated_data)
        #     serializer.save()
        #     return Response(serializer.data)
        
        return Response({"message":"success"}, status=status.HTTP_201_CREATED)
    

class UsermodelssAPIView(APIView):
    def get(self, request, pk=None, format=None):
        print(pk)
        if pk is None:
            users = Usermodelss.objects.all().exclude(is_superuser = True)

            serializer = CustomerSerializer(users, many=True)
            return Response(serializer.data)
        else:
            user = Usermodelss.objects.get(pk=pk)
            serializer = CustomerSerializer(user)
            return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id, format=None):
        try:
            user = Usermodelss.objects.get(id=id)
        except Usermodelss.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        
        data = request.body.decode('utf-8')
        data_dict = json.loads(data)

       
        for attr, value in data_dict.items():
            setattr(user, attr, value)

       
        user.save()

        return Response({"message": "success"}, status=status.HTTP_200_OK)

    def patch(self, request, pk, format=None):
        user = Usermodelss.objects.get(pk=pk)
        serializer = CustomerSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format=None):
        user = Usermodelss.objects.get(id=id)
        user.delete()
        return Response({"message": "success"},status=status.HTTP_204_NO_CONTENT)