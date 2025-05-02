from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from django.contrib.auth.hashers import make_password
import logging
from datetime import timedelta
logger = logging.getLogger(__name__)


def store_user_in_file():
    users  = User.objects.latest('id')
    with open("users.txt", "a") as file:
        file.write(f"Username: {users}\n")

        
class RegisterSerializer(serializers.ModelSerializer):
    print('Entered register serial')
    class Meta:
        model = User
        fields = ["username" , "password"]

    def to_internal_value(self, data):
        data['password'] = data.pop('key')
        return super().to_internal_value(data)

    def validate_username(self, value):
        print('Entered username val')
        if User.objects.filter(username=value).exists():
            print('DUPLICATION OF USER DETECTED')
            raise serializers.ValidationError("Username already exists.")
        return value
    
    # def validate(self, attrs):
    #     print('entered validate')
    #     # Move the 'key' into 'password'
    #     attrs['password'] = attrs.pop('key')
    #     return attrs

    def create(self, validated_data):
        print('Entered Create')
        users  = User.objects.values()
        hashed_password = make_password(validated_data['password'])
        user = User.objects.create(
            username = validated_data['username'],
            password = hashed_password
        )
        logger.info(f"User created: ID={user.id}, Username={user.username}")
        # store_user_in_file()
        return user
        
class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        try:
            logger.debug(f"Generating token for user: {user.username}")
            token = super().get_token(user)
            token['username'] = user.username
            logger.debug(f"Token generated successfully for user: {user.username}")
            token.set_exp(lifetime=timedelta(seconds=30))
            return token
        except:
            logger.error(f"Error while generating token for user: {user.username}")
            raise  # Re-raise the error after logging it
    print('Entered log serial')
    def to_internal_value(self, data):
        data['password'] = data.pop('key')
        return super().to_internal_value(data)