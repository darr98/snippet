import React, { useEffect, useState } from 'react';
import './test.css'; // Import CSS file

interface AppProps {}

const Todobox: React.FC<AppProps> = () => {
    const [memos, setMemos] = useState<string[]>([]);
    const [memoInput, setMemoInput] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000');

        ws.onopen = () => {
            console.log('WebSocket connection established.');
        };

        ws.onmessage = (event: MessageEvent) => {
            const newMemo = event.data as string;
            setMemos((prevMemos) => [...prevMemos, newMemo]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const addMemo = () => {
      if (socket) {
          const newMemos = [...memos, `Memo ${memos.length + 1}`];
          console.log('Sending new memos:', newMemos); // Add this line
          socket.send(JSON.stringify(newMemos));
      } else {
          console.log('Socket is not connected.'); // Add this line
      }
  };
  

    return (
        <div className="App">
            <h1>Real-Time Memo Stickers</h1>
            <div className="memo-container">
                {memos.map((memo, index) => (
                    <div key={index} className="memo-sticker">{memo}</div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type your memo..."
                value={memoInput}
                onChange={(e) => setMemoInput(e.target.value)}
            />
            <button onClick={addMemo}>Add Memo</button>
        </div>
    );
};

export default Todobox;
