import React, { useState } from 'react';
import './App.css';

interface Todo {
    id: number;
    notes: string;
    expanded: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [nextId, setNextId] = useState<number>(1);

    const addTodo = () => {
        setTodos([...todos, { id: nextId, notes: '', expanded: false }]);
        setNextId(nextId + 1);
    };

    const toggleExpand = (id: number) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
        ));
    };

    const handleNotesChange = (id: number, value: string) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, notes: value } : todo
        ));
    };

    return (
        <div className="App">
            <h1>Todo Memo Stickers</h1>
            <div className="todo-container">
                {todos.map(todo => (
                    <div key={todo.id} className="todo-item">
                        <div className="todo-header" onClick={() => toggleExpand(todo.id)}>
                            <h3>Todo {todo.id}</h3>
                            <button className="expand-button">
                                {todo.expanded ? '-' : '+'}
                            </button>
                        </div>
                        {todo.expanded && (
                            <textarea 
                                placeholder="Type your notes here..." 
                                value={todo.notes} 
                                onChange={(e) => handleNotesChange(todo.id, e.target.value)} 
                            />
                        )}
                    </div>
                ))}
                <button className="add-todo-button" onClick={addTodo}>+</button>
            </div>
        </div>
    );
};

export default App;