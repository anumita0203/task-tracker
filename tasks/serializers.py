from rest_framework import serializers
from .models import Task
from tags.serializers import TagSerializer

class TaskSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    subtasks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'created_at', 'completed', 'tags', 'parent_task', 'subtasks']