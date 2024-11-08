from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer

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
        
        # Call the default create() method
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        print("Retrieving task")
        response = super().retrieve(request, *args, **kwargs)
        print(f"Response data: {response.data}")
        return response