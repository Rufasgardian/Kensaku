from rest_framework import serializers
from .models import User # import User model from models.py
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db import IntegrityError

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        credentials = {
            'username': attrs.get('username'),
            'password': attrs.get('password')
        }

        if not all(credentials.values()):
            raise serializers.ValidationError("Both username and password are required.")

        try:
            user = User.objects.get(username=credentials['username'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Username or password is not correct.")

        if not user.check_password(credentials['password']):
            raise serializers.ValidationError("Username or password is not correct.")

        token = self.get_token(user)

        data = {}
        data['refresh'] = str(token)
        data['access'] = str(token.access_token)
        
        return data



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
        except IntegrityError as e:
            if 'email' in str(e):
                raise serializers.ValidationError({"email": "This email is already in use."})
            elif 'username' in str(e):
                raise serializers.ValidationError({"username": "This username is already in use."})
            else:
                raise serializers.ValidationError({"detail": "A unique constraint violation occurred."})
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return user

