from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers  import CustomerSerializer,LoginSerializer
from .models import Usermodelss



# Create your views here.
class RegisterationApi(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')

       
        if not (username and email and password1 and password2):
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

       
        if password1 != password2:
            return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        print(password1)
        user = Usermodelss(username=username, email=email, password=password1)
        user.save()

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

class LoginAPIView(TokenObtainPairView):
    pass
     
    