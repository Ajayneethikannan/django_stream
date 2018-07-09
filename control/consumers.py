from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from rest_framework.authtoken.models import Token

class streamConsumer(WebsocketConsumer):
    def connect(self):
        self.scope['user']  = None
        self.stream_group_name = 'control'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.stream_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.stream_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)#returns a dict not an object

        if 'token' in text_data_json:
            token = text_data_json['token']
            token = Token.objects.get(key = token)
            self.scope['user'] = token.user
            self.send(json.dumps({'message':self.channel_name}))


        if 'scontrol' in text_data_json:
            if self.authenticate():
                async_to_sync(self.channel_layer.group_send)(
                    self.stream_group_name,
                    {
                    'type': 'control.message',
                    'scontrol': text_data_json['scontrol'],
                    }
                )



    # Receive message from room group
    def control_message(self, event):
        a = {}
        for x in event:
            a[x] = event[x]
        if 'type' in event:
            del(a['type'])

        # Send message to WebSocket
        self.send(text_data=json.dumps(a))


    def control_update_queue(self, event):
        self.send(json.dumps({'provoked':'yeah'}))

    #makes sure that the user is logged in and the token still exists
    def authenticate(self):
        a  = self.scope['user']
        if a is None:
            return 0
        else:
            b  = Token.objects.get(user = a)
            if b is None:
                return 0
            else:
                return 1
