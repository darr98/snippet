// import React, { useState } from 'react';
// import './TodoContainer.css'; // Assume you create a CSS file for styles
// import TodoContainer from './TodoContainer';
// import Todobox from './Todobox';
// // Define the props type for TodoItem


// // const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick, isActive }) => {
// //     return (
// //         <div className="todo-item">
// //             <div onClick={onClick} className="todo-text">
// //                 {todo}
// //             </div>
// //             {isActive && (
// //                 <button className="action-button">Action</button>
// //             )}
// //         </div>
// //     );
// // };

// const App: React.FC = () => {
//     return (
//       // <TodoContainer></TodoContainer>
//       // <TodoContainer></TodoContainer>
//       <Todobox></Todobox>
//     );
// };

// export default App;



import React, { useState, useEffect } from 'react';
// import './test.css';
import { motion } from "framer-motion";
import * as Checkbox from "@radix-ui/react-checkbox";
import "./Memo.css";
interface AppProps {}


const App: React.FC<AppProps> = () => {
  const [memos, setMemos] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection established.');
      setIsConnected(true);
    };

    ws.onmessage = (event: MessageEvent) => {
      const updatedMemos = JSON.parse(event.data as string) as string[];
      setMemos(updatedMemos);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
      setIsConnected(false); 
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
    }

    };
  }, []);

  const addMemo = () => {
    console.log('calling add memo')
    if (socket && isConnected) {
      const newMemos = [...memos, `Memo ${memos.length + 1}`];
      setMemos(newMemos)
      socket.send(JSON.stringify(newMemos));
      console.log(`the MEMO current length is ${memos.length}}`)
    }
  };

  return (
    <div className="App">
      <h1>Real-Time Memo Stickers</h1>
      <div className="memo-container">
        {memos.map((memo, index) => (
          <div key={index} className="memo-sticker">{memo}</div>
        ))}
        <button onClick={addMemo} className="add-button">+</button>
      </div>
    </div>
  );
};

 export default App