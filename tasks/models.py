from django.db import models
from tags.models import Tag

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    tags = models.ManyToManyField(Tag, related_name="tasks", blank=True)
    parent_task = models.ForeignKey('self', on_delete=models.CASCADE, related_name="subtasks", null=True, blank=True)

    def __str__(self):
        return self.title
