from django.shortcuts import render
from rest_framework import  authentication, permissions
from rest_framework.views import APIView
from rest_auth.views import LogoutView
# Create your views here.

class TestAuthView(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
  
    def get(self, request, format=None):
        return Response(request.user)

class LogoutViewEx(LogoutView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes =  (permissions.IsAuthenticated,)

