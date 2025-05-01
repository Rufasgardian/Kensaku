from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from .models import User
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
