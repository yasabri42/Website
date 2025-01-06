from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from . import views

app_name = 'user'

urlpatterns = [

    path('login/', views.login_view, name='login_view'),
    path('signup/', views.signup_view, name='signup_view'),
    path('profile/', views.profile_view, name='profile_view'),

    path('api/signup/', views.SignupAPIView.as_view(), name='signup_apiview'),
    path('api/login/', views.LoginAPIView.as_view(), name='login_apiview'),
    path('api/logout/', views.LogoutAPIView.as_view(), name='logout_apiview'),
    path('api/profile/', views.ProfileAPIView.as_view(), name='profile_apiview'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]