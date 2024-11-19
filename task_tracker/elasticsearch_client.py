from elasticsearch import Elasticsearch
from decouple import config

elastic_password = config("ELASTIC_PASSWORD")

es_client = Elasticsearch(
    "https://localhost:9200",
    http_auth=("elastic", elastic_password),
    verify_certs=False
)

def get_es_client():
    return es_client
