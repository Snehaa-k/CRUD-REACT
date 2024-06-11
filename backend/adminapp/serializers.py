# from rest_framework import serializers
# from django.contrib.auth.hashers import make_password
# from django.contrib.auth.models import User

# # class Adminserilizer(serializers.ModelSerializer):
#     class meta:
#         model = User
#         fields = ["id","username","password"]
#         extra_kwargs = {"password":{"write_only":True}}

    
#     def create(self, validated_data):
#         user = User.objects.create_superuser(**validated_data)
#         return user
     
