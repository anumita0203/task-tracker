from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/tasks/', include('tasks.urls')),
    path('api/tags/', include('tags.urls')), 
    path("api/journal/", include("journals.urls")),
]
