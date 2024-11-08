// TaskList.js
import React from 'react';
import axios from 'axios';

function TaskList({ tasks, onTaskStatusChange }) {
    const toggleTaskCompletion = (taskId, currentStatus) => {
        axios.patch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, { completed: !currentStatus })
            .then(onTaskStatusChange)
            .catch(error => console.error("Error updating task status:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Task List</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <li key={task.id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>
                                <strong>{task.title}</strong> - {task.description}
                                {task.tags.length > 0 && (
                                    <div>
                                        Tags: {task.tags.map(tag => (
                                            <span key={tag.id} className="badge badge-primary ml-1">{tag.name}</span>
                                        ))}
                                    </div>
                                )}
                                {task.subtasks && task.subtasks.length > 0 && (
                                    <div>
                                        Subtasks:
                                        <ul>
                                            {task.subtasks.map(subtaskId => {
                                                const subtask = tasks.find(t => t.id === subtaskId);
                                                return subtask ? (
                                                    <li key={subtask.id}>
                                                        {subtask.title} - {subtask.completed ? "Completed" : "Pending"}
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </span>
                            <button
                                className={`btn ${task.completed ? "btn-success" : "btn-outline-secondary"}`}
                                onClick={() => toggleTaskCompletion(task.id, task.completed)}
                            >
                                {task.completed ? "Completed" : "Mark Complete"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
