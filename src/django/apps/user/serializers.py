from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'bio', 'score']
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ['id', 'score']

    def validate(self, data):
        if CustomUser.objects.filter(username=data.get('username')).exists():
            raise serializers.ValidationError()
        if CustomUser.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({'email': 'This email is already registrered.'})
        return data

    def create(self, validated_data):
        return CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )