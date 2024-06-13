from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usermodelss,Userprofile


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usermodelss
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userprofile
        fields = ['profile_image']
   