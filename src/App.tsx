import React, { useState } from 'react';
import './TodoContainer.css'; // Assume you create a CSS file for styles
import TodoContainer from './TodoContainer';
// Define the props type for TodoItem


const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick, isActive }) => {
    return (
        <div className="todo-item">
            <div onClick={onClick} className="todo-text">
                {todo}
            </div>
            {isActive && (
                <button className="action-button">Action</button>
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
      <TodoContainer></TodoContainer>
    );
};

export default App;
