from rest_framework import serializers
from .models import Task
from tags.models import Tag

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed']

class TaskSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True)
    subtasks = SubtaskSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'created_at', 'completed', 'tags', 'parent_task', 'subtasks']

    def create(self, validated_data):
        tag_names = validated_data.pop('tags', [])
        task = Task.objects.create(**validated_data)
        
        # Process each tag name
        for tag_name in tag_names:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            task.tags.add(tag)
        
        return task

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tags', [])
        instance = super().update(instance, validated_data)
        
        # Clear existing tags and add updated tags
        instance.tags.clear()
        for tag_name in tag_names:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            instance.tags.add(tag)
        
        return instance
