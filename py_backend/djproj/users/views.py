from django.shortcuts import render
from rest_framework import status ,serializers
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import RegisterSerializer ,CustomTokenSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model  
from rest_framework_simplejwt.exceptions import TokenError
import time
from datetime import datetime,timezone

User = get_user_model()
# Create your views here
class RegisterView(APIView):
    print('Entered Register View')
    def post(self, request):
        print('entered POST')
        serializer = RegisterSerializer(data =request.data)
        print("PRINTING SERIALIZER IS VALID")
        print(serializer.is_valid())  # add this
        print("PRINTING SERIALIZER ERRORS")
        print(serializer.errors) 
        print("End of serializers PRITNS")
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data ,status=status.HTTP_201_CREATED)
        else:
            return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class CustomTokenObtainPairView(TokenObtainPairView):
    print('Entered Login token View')
    serializer_class = CustomTokenSerializer

    def post(self,request):
        serializer = self.get_serializer(data = request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        access_token = serializer.validated_data.get('access')
        refresh_token = serializer.validated_data.get('refresh')

        response = Response({
            "access"  :access_token,
            "user"  : serializer.user.username,
            "refresh"  : refresh_token,
        }, status=status.HTTP_200_OK)
        return response
        ##For produciton only  ,timebeing were passing refresh to normal response
        # response.set_cookie(
        #     key ='refresh_token',
        #     value= refresh_token,
        #     httponly=True,
        #     secure=False, 
        #    samesite='None',
        #     max_age=60,
        #     path ='/'
        # )

        
class RefreshTokenView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        print('I Entered REFRESH')
        refresh_token = request.data.get('refresh')
        print(f'3.  refresh_token : {refresh_token[-10:-1]}')
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            access_token = serializer.validated_data['access']
            print(f'4.  New access token  : {access_token[-5:-1]}')
            # Decode the refresh token to get the user
            try:
                refresh = RefreshToken(request.data['refresh'])
                exp = refresh["exp"]
                current_time = int(time.time())
                print(f'6. Current time: {current_time}')
                print(f'6. Expiration time: {refresh["exp"]}')
                # c =datetime.datetime.fromtimestamp(exp)
                fexp = datetime.fromtimestamp(exp, tz=timezone.utc)
                print(f'6. Expiry formatted time: {fexp}')
                fcurr = datetime.fromtimestamp(current_time, tz=timezone.utc)
                print(f'6. Current formatted time: {fcurr}')
                if refresh['exp'] < current_time:
                    print('Token is expired!')
                    return Response({'detail': 'Refresh token has expired'}, status=status.HTTP_401_UNAUTHORIZED)

                user_id  = refresh['user_id']
                print(f'5. user id   : {user_id}')
                user = User.objects.get(id=user_id)
                print(f'6. user name : {user.username}')
                print('-----------------------------------------------------')
                return Response({
                    'access': access_token,
                    'username': user.username
                }, status=status.HTTP_200_OK)
            except TokenError as e:
                   print(f"9. Token Error: {str(e)}")
                   return Response({'detail': 'Token is invalid or expired'}, status=status.HTTP_401_UNAUTHORIZED)


        except Exception as e:
            print(f"9.  Error refreshing token: {str(e)}")
            print('-----------------------------------------------------')
            return Response({'detail': 'Token is invalid or expired'}, status=status.HTTP_401_UNAUTHORIZED)