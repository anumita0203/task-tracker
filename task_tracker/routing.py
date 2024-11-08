import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import re_path
from tasks.consumers import TaskConsumer
from django.core.asgi import get_asgi_application  # Import the application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "task_tracker.settings")

websocket_urlpatterns = [
    re_path(r'ws/tasks/$', TaskConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
