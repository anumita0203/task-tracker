# tasks/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()  # Accept the WebSocket connection

    async def disconnect(self, close_code):
        pass  # Handle disconnection if necessary

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message', 'No message received')
        
        # Echo the message back to the WebSocket
        await self.send(text_data=json.dumps({
            'message': f"Received: {message}"
        }))
