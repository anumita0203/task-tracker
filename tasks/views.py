from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
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
        serializer = TaskSerializer(data=request.data)
        # Call the default create() method
        # return super().create(request, *args, **kwargs)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        return response