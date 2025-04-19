from pymongo import MongoClient

# Replace with your actual MongoDB connection string
MONGO_URI = "mongodb+srv://darrylshan98:darrylshan98@cluster0.i4hje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["test1DB"]  # Change to your actual database name
collection = db["memotesting"]  # Change to your actual collection name

# Test connection when this file is run
if __name__ == "__main__":
    try:
        client.admin.command('ping')
        print("✅ Successfully connected to MongoDB Atlas!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")
