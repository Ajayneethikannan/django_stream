from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    year = models.IntegerField(default=1)
    level = models.IntegerField(default=0)
    tag = models.CharField(max_length=100, default="Someone's gotta queue them up!")

class Song(models.Model):
    created = models.DateField(auto_now_add=True)
    videoId = models.CharField(max_length=100, primary_key=True)
    song_name = models.CharField(max_length=100)
    img_url = models.CharField(max_length=100, default='https://www.google.co.in/search?q=music+icon&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiq-MTm6I_cAhWFTX0KHYJIBIUQ_AUICigB&biw=1478&bih=666#imgrc=VRGDtXme9Z1bpM:')
    level = models.IntegerField(default = 0)
    fans = models.ManyToManyField(User)
