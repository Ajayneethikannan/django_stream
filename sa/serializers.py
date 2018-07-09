from rest_framework.serializers import ModelSerializer
from sa.models import Song
from django.contrib.auth.models import User

class SongSerializer(ModelSerializer):

    class Meta:
        model = Song
        fields = ['videoId', 'song_name', 'img_url', 'level'] #serializing users is not necassary
