import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';
import TaskWebSocket from './components/TaskWebSocket';
import JournalEntry from './components/JournalEntry';
import ChatBot from './components/ChatBot';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TaskManager />} />
                <Route path="/tasks/:id" element={<TaskDetail />} />
                <Route path="/add-task" element={<TaskForm />} />
                <Route path="/add-subtask/:parentTaskId" element={<TaskForm />} />
                <Route path="/get-notifications" element={<TaskWebSocket />} />
                <Route path="/journal" element={<JournalEntry apiUrl="http://localhost:8000/api/journal/" />} />
                <Route path="/chat" element={<ChatBot apiUrl="http://localhost:8000/api/chat/" />} />
            </Routes>
        </Router>
    );
}

export default App;
