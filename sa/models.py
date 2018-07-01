from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    year = models.IntegerField(default=1)
    level = models.IntegerField(default=0)
    tag = models.CharField(max_length=100, default="Someone's gotta queue them up!")



