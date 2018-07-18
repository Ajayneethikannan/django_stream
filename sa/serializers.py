from rest_framework.serializers import ModelSerializer
from sa.models import Song
from sa.models import User

class SongSerializer(ModelSerializer):

    class Meta:
        model = Song
        fields = ['videoId', 'song_name', 'img_url', 'level'] #serializing users is not necassary

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'level', 'year', 'tag']
