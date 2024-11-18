from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer
from .elasticsearch_logger import log_to_elasticsearch

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        # return self.queryset
        return Task.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        response = super().list(request, *args, **kwargs)
        return response

    def create(self, request, *args, **kwargs):
        # You can add custom logic here before calling the default create behavior.
        # For example, adding custom validation or modifying the incoming data.
        serializer = TaskSerializer(data=request.data)
        # Call the default create() method
        # return super().create(request, *args, **kwargs)
        if serializer.is_valid():
            self.perform_create(serializer)
            task_data = serializer.data
            log_to_elasticsearch(
                action="create",
                task_id=task_data.get("id"),
                user=request.user.username,
                details=f"Task created with title: {task_data.get('title')}"
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return response