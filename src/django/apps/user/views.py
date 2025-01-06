from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer
from .models import CustomUser
from django.views.decorators.http import require_http_methods


def email_authentication(email=None, password=None):
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return None
    if user.check_password(password):
        return user
    return None

def render_htmx_or_full(request, partial_template, full_template):
    if request.headers.get('HX-Request'):
        return render(request, partial_template)
    return render(request, full_template, {'content_template': partial_template})

@require_http_methods(['GET'])
def login_view(request):
    return render_htmx_or_full(request, 'user/login.html', 'home/home.html')

@require_http_methods(['GET'])
def signup_view(request):
    return render_htmx_or_full(request, 'user/signup.html', 'home/home.html')

@require_http_methods(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    return render_htmx_or_full(request, 'user/profile.html', 'home/home.html')

class SignupAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = email_authentication(password=password, email=email)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            })
        return Response({"error": "Invalid credentials"}, status=400)

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": "Logout failed. Please try again later."}, status=status.HTTP_400_BAD_REQUEST)

class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)