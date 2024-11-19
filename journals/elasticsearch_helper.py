from task_tracker.elasticsearch_client import get_es_client

es = get_es_client()

def index_journal_entry(entry_id, text):
    es.index(index="journal_entries", id=entry_id, body={"text": text})

def search_journal_entries(query):
    return es.search(index="journal_entries", body={"query": {"match": {"text": query}}})
