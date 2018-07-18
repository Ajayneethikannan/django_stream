from django.shortcuts import render
from rest_framework import authentication, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.mixins import CreateModelMixin
from rest_framework.mixins import ListModelMixin
from sa.models import User, Song
from rest_framework.request import Request
from rest_framework.response import Response
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from sa.serializers import SongSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, authentication_classes, permission_classes
import json

class SongControl(GenericAPIView, DestroyModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Song.objects.order_by('-level','created',)
    serializer_class  = SongSerializer
    lookup_field = 'videoId'
    channel_layer = get_channel_layer()
    #kwarg must be included in the url for create and update
    #create method inbuilt
    def perform_create(self, serializer):
        serializer.save(fans=[User.objects.get(username = self.request.user.username)])
        async_to_sync(self.channel_layer.group_send)("control",{'type':'control.update_queue',})



    def get(self, request):#only listing
        return self.list(request)

    def post(self, request): #for updating and creating songs
        videoId = request.data['videoId']
        queryset = self.get_queryset()
        try:
            a = Song.objects.get(videoId=videoId)
            if request.user not in a.fans.all():
                a.fans.add(request.user)
                a.level += request.user.level
                a.save()
                async_to_sync(self.channel_layer.group_send)("control",{'type':'control.update_queue',})
                return Response("success")
            else:
                return Response("fail")

        except Song.DoesNotExist:   #create
            request.data['level'] = request.user.level
            song = self.create(request)
            return Response("song added")


@api_view(['DELETE'])
@authentication_classes([authentication.TokenAuthentication,])
@permission_classes([permissions.IsAuthenticated,])
def DeleteSong(request, videoId):
    try:
        a = Song.objects.get(videoId = videoId)
        if request.user.level >= a.level:
            a.delete()
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)("control",{'type':'control.update_queue',})
            return Response("deleted")
        else:
            return Response("not allowed")

    except Song.DoesNotExist:
        return Response("song does not exist")

class UserControl(GenericAPIView, ListModelMixin):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    queryset = User.objects.order_by('level')
    serializer_class = UserSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        user = request.user
        if 'tag' in request.data or 'year' in request.data:
            user.tag = request.data['tag']
            user.year = request.data['year']
            user.save()
        return Response(UserSerializer(request.user).data)

    def delete(self, request):
        request.user.delete()
        return Response("deleted")
