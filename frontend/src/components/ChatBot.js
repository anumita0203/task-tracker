import React, { useState } from "react";
import axios from "axios";

const ChatBot = ({ apiUrl }) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleAsk = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, { question });
            setAnswer(response.data.answer);
        } catch (error) {
            console.error("Error fetching answer:", error);
            alert("Failed to fetch answer.");
        }
    };

    return (
        <div>
            <form onSubmit={handleAsk}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    required
                />
                <button type="submit">Ask</button>
            </form>
            {answer && <p>Answer: {answer}</p>}
        </div>
    );
};

export default ChatBot;
