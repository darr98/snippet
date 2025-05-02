import asyncio
import websockets
import json
import sys
import os

# Add project_root to sys.path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(project_root)
from DBConn.mongodb import collection

# Print the resolved path to check
print(f"🔍 Resolved project root path: {project_root}")

connected_clients = set()
memos_state = []  # Global variable

async def echo(websocket):
    global memos_state  # Declare as global so it can be modified

    # Register new client
    connected_clients.add(websocket)
    print(f"Client connected: {websocket}")

    try:
        # Send current states to the new client
        await websocket.send(json.dumps(memos_state))

        # Fetch and broadcast data
        async for message in websocket:
            print(f"Received message: {message}")
            memos_state = json.loads(message)  # Modify the global variable

            # Broadcast message to all clients except sender
            for client in connected_clients.copy():  # Copy set to avoid modification issues
                if client != websocket:
                    try:
                        await client.send(message)
                        print(f"Sent message to {client}")
                    except websockets.exceptions.ConnectionClosed:
                        print(f"Client {client} disconnected before receiving message.")
                        connected_clients.remove(client)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if websocket in connected_clients:
            connected_clients.remove(websocket)
        print(f"Client disconnected: {websocket}")

async def main():
    start_server = await websockets.serve(echo, "localhost", 8080)

    print("WebSocket server started on ws://localhost:8080")
    await start_server.wait_closed()  # Keep the server running

if __name__ == "__main__":
    asyncio.run(main())
