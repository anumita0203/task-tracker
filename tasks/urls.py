# tasks/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

urlpatterns = [
    path('', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='tasks'),
    path('<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update'}), name='task-detail'),
]

