from decouple import config
from elasticsearch import Elasticsearch
from datetime import datetime

elastic_password = config("ELASTIC_PASSWORD")

es = Elasticsearch(
    "https://localhost:9200",
    http_auth=("elastic", elastic_password),
    verify_certs=False
)

def log_to_elasticsearch(action, task_id, user, details):
    log_entry = {
        "timestamp": datetime.utcnow(),
        "action": action,
        "task_id": task_id,
        "user": user,
        "details": details
    }
    es.index(index="task_tracker_logs", body=log_entry)
