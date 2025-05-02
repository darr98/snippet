import React, { useEffect, useState } from 'react';
import './App.css';

interface Todo {
    id: number;
    notes: string;
    expanded: boolean;
    editingUser?: string; // Track who is editing the memo
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [nextId, setNextId] = useState<number>(1);
    const [currentUser] = useState<string>('User1'); // Simulate different users
    const [ws, setWs] = useState<WebSocket | null>(null);
  
    useEffect(() => {

        const websocket = new WebSocket('ws://localhost:3000');
        setWs(websocket); 
        websocket.onopen =()=>{
                console.log('websocket connction Opened')

        }
        
        websocket.onmessage = (event) => {
            console.log(`something cHANGED ${event.data}`)
            const data = JSON.parse(event.data);
            if (data.type === 'todos') {
                setTodos(data.todos)

            }
            if (data.type === 'editing') {
                setTodos(todos.map(todo =>
                    todo.id === data.memoId ? { ...todo, editingUser: data.user } : todo
                ));
            }
        };

     
        return () => {
            // console.log('something closing')
            if (websocket.readyState === WebSocket.OPEN) {
                console.log('Closing WebSocket');
                websocket.close();
            }
        };
    }, []);

    const addTodo = () => {
        setTodos([...todos, { id: nextId, notes: '', expanded: false }]);
        ws?.send(JSON.stringify({ type: 'addTodo', memoId: nextId, user: currentUser }));
        setNextId(nextId + 1);
    };

    const handleEditClick = (id: number) => {
        console.log(`my todo id  :${id}`)
        const todo = todos.find(todo => todo.id === id);
        if (todo && todo.editingUser && todo.editingUser !== currentUser) {
            alert(`Memo is currently being edited by ${todo.editingUser}. Please wait.`);
        } else {
            // Notify server that this memo is being edited
            ws?.send(JSON.stringify({ type: 'edit', memoId: id, user: currentUser }));
            setTodos(todos.map(todo => 
                todo.id === id ? { ...todo, editingUser: currentUser } : todo
            ));
        }

    };
 
    const handleNotesChange = (id :number ,value :string)=>{
        console.log('entering handle Notes')
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
                        <div className="todo-header" onClick={() => handleEditClick(todo.id)}>
                            <h3>Todo {todo.id}</h3>
                            <button className="expand-button">+</button>
                        </div>
                        {todo.editingUser && todo.editingUser !== currentUser && (
                            <p className="editing-message">One user is modifying this memo.</p>
                        )}
                        {/* Add textarea for notes here */}
                        
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