import React, { useState } from 'react';
import axios from 'axios';

function TagForm({ onTagAdded }) {
    const [tagName, setTagName] = useState("");

    const handleTagSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/tags/', { name: tagName })
            .then(() => {
                onTagAdded();
                setTagName("");
            })
            .catch(error => console.error("Error creating tag:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Add a Tag</h2>
            <form onSubmit={handleTagSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tag Name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Tag</button>
            </form>
        </div>
    );
}

export default TagForm;
