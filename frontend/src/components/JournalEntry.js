import React, { useState } from "react";
import axios from "axios";

const JournalEntry = ({ apiUrl }) => {
    const [text, setText] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(apiUrl+"journals/", { text });
            setText("");
            alert("Journal entry saved!");
        } catch (error) {
            console.error("Error saving journal entry:", error);
            alert("Failed to save entry.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your journal entry here..."
                required
            />
            <button type="submit">Save Entry</button>
        </form>
    );
};

export default JournalEntry;
