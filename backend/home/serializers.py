from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usermodelss


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usermodelss
        fields = ['id', 'username', 'email', 'password1','password2']
        extra_kwargs = {'password1': {'write_only': True}, 'password2': {'write_only': True}}
    
    def create(self, validated_data):
        user = Usermodelss.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = Usermodelss.objects.filter(email=email).first()
        if user and user.check_password(password):
            return user
        raise serializers.ValidationError("Incorrect email or password")