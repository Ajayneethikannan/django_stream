"""django_stream URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from rest_auth.views import LoginView
from sa.views import TestAuthView, LogoutViewEx
from control.views import SongControl, DeleteSong, UserControl
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^rest-auth/', include('rest_auth.urls')),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    path('test_auth/',TestAuthView.as_view(), name='test_auth'),
    path('logout/', LogoutViewEx.as_view(), name='rest_logout'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('user/', UserControl.as_view(), name='user_control'),
    path('control/', SongControl.as_view(), name='control'),
    re_path(r'^delete/(?P<videoId>[0-9a-zA-Z_\-]+)/$', DeleteSong, name='delete'),

]
