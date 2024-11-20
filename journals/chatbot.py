import google.generativeai as genai
from decouple import config
import logging

# Initialize the Gemini API with your API key
genai.configure(api_key=config("GEMINI_API_KEY"))

# Set up basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_search_query(prompt):
    """
    Generates a search query based on the given prompt using Gemini's model.
    """
    logger.info("Asking bot for search query generation...")
    
    # Replace the message structure to match Gemini's expected input
    try:
        logger.info("Asking the model...")
        
        # Use the Gemini API to generate the content
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"Generate an elasticsearch search query for: {prompt}. The relevant indices are - tasks.")
        
        # Print and log the result
        result = response.text
        print("Generated Search Query:", result)
        logger.info(f"Generated search query: {result}")
        return result.strip()
    
    except Exception as e:
        logger.error(f"Error during API call: {e}")
        print(f"Error during API call: {e}")
        return "Error generating search query."

def generate_answer(context, question):
    """
    Generates an answer to a question based on the provided context using Gemini's model.
    """
    logger.info("Asking bot for question answering...")
    
    try:
        # Use the Gemini API to generate the content for question answering
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(f"Use this context to answer the question:\n\n{context}\n\nQuestion: {question}")
        
        # Print and log the result
        result = response.text
        print("Generated Answer:", result)
        logger.info(f"Generated answer: {result}")
        return result.strip()
    
    except Exception as e:
        logger.error(f"Error during API call: {e}")
        print(f"Error during API call: {e}")
        return "Error generating answer."
