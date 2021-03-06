# Generated by Django 2.0.6 on 2018-07-08 16:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sa', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('created', models.DateField(auto_now_add=True)),
                ('videoId', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('song_name', models.CharField(max_length=100)),
                ('img_url', models.CharField(default='https://www.google.co.in/search?q=music+icon&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiq-MTm6I_cAhWFTX0KHYJIBIUQ_AUICigB&biw=1478&bih=666#imgrc=VRGDtXme9Z1bpM:', max_length=100)),
                ('level', models.IntegerField(default=0)),
                ('fans', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
