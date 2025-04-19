import asyncio
import websockets

connected_clients = set()

async def echo(websocket, path):
    # Register new client
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            # Broadcast message to all connected clients
            for client in connected_clients:
                if client != websocket:  # Don't send the message back to the sender
                    await client.send(message)
    finally:
        # Unregister client on disconnect
        connected_clients.remove(websocket)

start_server = websockets.serve(echo, "localhost", 8000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
