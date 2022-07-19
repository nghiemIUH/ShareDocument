import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from . import models, serializers


class CommentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['username']
        self.room_group_name = 'note_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'handleNote',
                'data': text_data_json
            }
        )

    # Receive message from room group
    async def handleNote(self, event):
        print('====================')
        print(self.room_group_name)

        print('save')

        data = event['data']
        if data['username'] != data['auth']['username']:
            user = await getUser(data['username'])
            otherUser = await getUser(data['auth']['username'])
            note = await createNotification(user, data['url'], data['description'], otherUser)
        else:
            note = ''
        # Send note to WebSocket
        await self.send(text_data=json.dumps({
            'comment': {
                'auth': data['auth'],
                'content': data['content']
            },
            'type': 'comment',
            'note': note
        }))


@database_sync_to_async
def getUser(username):
    user = get_user_model().objects.get(username=username)
    return user


@database_sync_to_async
def createNotification(user, url, description, otherUser):
    note = models.Notification.objects.create(
        user=user, url=url, description=description, otherUser=otherUser)
    return serializers.NotificationSerialize(note).data
