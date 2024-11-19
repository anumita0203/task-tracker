import openai
from decouple import config

openai.api_key = config("OPENAPI_KEY")  # Use environment variables in production

def generate_search_query(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Generate a search query for: {prompt}",
        max_tokens=50
    )
    return response.choices[0].text.strip()

def generate_answer(context, question):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Use this context to answer the question:\n\n{context}\n\nQuestion: {question}",
        max_tokens=150
    )
    return response.choices[0].text.strip()
