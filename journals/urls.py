from django.urls import path
from .views import JournalEntryView, ChatBotView

urlpatterns = [
    path("journals/", JournalEntryView.as_view(), name="journal-entry"),
    path("chat/", ChatBotView.as_view(), name="chat-bot"),
]
