from rest_framework.views import APIView
from rest_framework.response import Response
from .models import JournalEntry
from .elasticsearch_helper import index_journal_entry, search_journal_entries
from .chatbot import generate_search_query, generate_answer

class JournalEntryView(APIView):
    def post(self, request):
        text = request.data.get("text")
        user = request.data.get("user", "anonymous")  # Replace with authenticated user if available
        entry = JournalEntry.objects.create(user=user, text=text)
        index_journal_entry(entry.id, text)
        return Response({"message": "Journal entry saved and indexed successfully!"})

class ChatBotView(APIView):
    def post(self, request):
        question = request.data.get("question")
        search_query = generate_search_query(question)
        search_results = search_journal_entries(search_query)
        
        context = "\n".join([hit["_source"]["text"] for hit in search_results["hits"]["hits"]])
        answer = generate_answer(context, question)
        return Response({"answer": answer})
