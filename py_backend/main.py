import asyncio
import websockets
import json
import datetime
# Store todos in memory
todos = []
current_editing = None  # Track which memo is being edited

async def handler(websocket, path):
    global current_editing
    connections.add(websocket)

    # Send existing todos to the newly connected client
    print(f"Sending todos now")
    print(f"New connection: {websocket}")
    print(f'the todos curr are recied ${todos} ${datetime.datetime.now()}' )
    await websocket.send(json.dumps({"type": "todos", "todos": todos}))
    

    try:
        async for message in websocket:
            data = json.loads(message)
            print(f'the data recied ${data}')
            if data["type"] == "edit":
                print(f"we have edit")
                # Update which user is editing the memo
                todo_id = data["memoId"]
                user = data["user"]

                # Check if another user is editing this memo
                if current_editing and current_editing["memoId"] == todo_id:
                    await websocket.send(json.dumps({
                        "type": "editing",
                        "memoId": todo_id,
                        "user": current_editing["user"]
                    }))
                else:
                    current_editing = {"memoId": todo_id, "user": user}
                    # Update todos to reflect the editing user
                    for todo in todos:
                        if todo["id"] == todo_id:
                            todo["editingUser"] = user

                    # Notify all clients about the editing status
                    await broadcast({"type": "editing", "memoId": todo_id, "user": user})

            elif data["type"] == "addTodo":
                print(f"we have addTodo")
                new_todo = {"id": len(todos) + 1, "notes": "", "expanded": False}
                todos.append(new_todo)
                await broadcast({"type": "todos", "todos": todos})

            elif data["type"] == "updateNote":
                print(f"we have update")
                todo_id = data["memoId"]
                notes = data["notes"]

                for todo in todos:
                    if todo["id"] == todo_id:
                        todo["notes"] = notes
                
                await broadcast({"type": "todos", "todos": todos})
    
    except websockets.ConnectionClosed:
        print(f"Recieved path Closed :{path}")
    finally:
        connections.remove(websocket)
        print(f"Connection removed: {websocket}")



async def broadcast(message):
    # Send a message to all connected clients
    for connection in connections:
        if connection.open:
            print(f"Hello, we hve open connection ${connection}")
            await connection.send(json.dumps(message))

connections = set()

async def main():
    print("Hello, main!")
    async with websockets.serve(handler, "localhost", 3000):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())