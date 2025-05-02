from django.contrib import admin
from django.urls import path,include
from users.views import RegisterView,CustomTokenObtainPairView,RefreshTokenView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/',   CustomTokenObtainPairView.as_view()),
    path('refresh/', RefreshTokenView.as_view())
]
