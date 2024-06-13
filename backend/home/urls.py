from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

urlpatterns = [
   path('signup/', views.RegisterationApi.as_view(),name="register"),
   path('login/',views.CustomTokenObtainPairView.as_view(),name='token_obtain_pair'),
   path('profile/',views.ProfileDetail.as_view(),name='profile'),
   path('profileimg/<str:user_id>',views.ProfileImageUpload.as_view(),name='profile'),
   path('profileview/',views.Profileview.as_view(),name='profileimg'),
   path('userview/',views.UsermodelssAPIView.as_view(),name='userview'),
   path('userview/<str:id>/',views.UsermodelssAPIView.as_view(),name='userview'),





]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
