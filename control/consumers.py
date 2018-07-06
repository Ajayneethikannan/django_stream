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
        message = 1
        if 'token' in text_data_json:
            token = text_data_json['token']
            token = Token.objects.get(key = token)
            self.scope['user'] = token.user
            message = self.scope['user'].username



        if self.authenticate():
            async_to_sync(self.channel_layer.group_send)(
                self.stream_group_name,
               {
                   'type': 'control.message',
                   'message': message,
               }
            )



    # Receive message from room group
    def control_message(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
        }))
        
    #makes sure that the user is logged in
    def authenticate(self):
        a  = self.scope['user']
        b  = Token.objects.get(user = a)
        if a is None or b is None:
            return 0
        else:
            return 1
