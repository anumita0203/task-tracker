# from rest_framework import serializers
# from .models import Task
# from tags.serializers import TagSerializer
# from tags.models import Tag

# class TaskSerializer(serializers.ModelSerializer):
#     tags = TagSerializer(many=True, read_only=True)  # Read-only for output
#     tag_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all(), write_only=True)  # For input
#     parent_task = serializers.PrimaryKeyRelatedField(allow_null=True, queryset=Task.objects.all(), required=False)
#     subtasks = serializers.SerializerMethodField()

#     class Meta:
#         model = Task
#         fields = ['id', 'title', 'description', 'created_at', 'completed', 'tags', 'tag_ids', 'parent_task', 'subtasks']

#     def get_subtasks(self, obj):
#         # Fetch subtasks that have this task as their parent
#         subtasks = Task.objects.filter(parent_task=obj)
#         return TaskSerializer(subtasks, many=True).data

#     def create(self, validated_data):
#         tag_ids = validated_data.pop('tag_ids', [])
#         task = super().create(validated_data)
        
#         # Add tags to the task
#         task.tags.set(tag_ids)
#         return task

#     def update(self, instance, validated_data):
#         tag_ids = validated_data.pop('tag_ids', [])
#         task = super().update(instance, validated_data)

#         # Update the tags
#         task.tags.set(tag_ids)
#         return task

# serializers.py
from rest_framework import serializers
from .models import Task
from tags.models import Tag

class TaskSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True)
    subtasks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'created_at', 'completed', 'tags', 'parent_task', 'subtasks']

    def get_subtasks(self, obj):
        # Fetch subtasks that have this task as their parent
        subtasks = Task.objects.filter(parent_task=obj)
        return TaskSerializer(subtasks, many=True).data

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
