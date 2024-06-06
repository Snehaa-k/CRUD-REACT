from . import views
from django.urls import path

urlpatterns = [
   path('signup/', views.RegisterationApi.as_view(), name ='signup'),
   path('login/',views.LoginAPIView.as_view(),name='token_obtain_pair'),
]
