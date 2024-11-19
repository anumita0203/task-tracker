from task_tracker.elasticsearch_client import get_es_client
from datetime import datetime

es = get_es_client()

def log_to_elasticsearch(action, task_id, user, details):
    log_entry = {
        "timestamp": datetime.utcnow(),
        "action": action,
        "task_id": task_id,
        "user": user,
        "details": details
    }
    es.index(index="task_tracker_logs", body=log_entry)