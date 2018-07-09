from django.shortcuts import render
from rest_framework import  authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_auth.views import LogoutView
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
# Create your views here.

class TestAuthView(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)("control",{'type':'control.message','user':request.user.username,})
        return Response(request.user.username)

class LogoutViewEx(LogoutView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes =  (permissions.IsAuthenticated,)
