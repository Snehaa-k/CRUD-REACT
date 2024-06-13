from django.db import models
from django.contrib.auth.models import AbstractUser,Group,Permission

# Create your models here.
class Usermodelss(AbstractUser):
    username = models.CharField(max_length=800,null=True)
    email = models.EmailField( max_length=254,unique=True,null=True)
    password1=models.IntegerField(null=True)
    password2=models.IntegerField(null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    groups = models.ManyToManyField(Group, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions')
    def __str__(self):
        return self.username
    

class Userprofile(models.Model):
    user = models.ForeignKey(Usermodelss,on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to='media', blank=True, null=True)
    
    