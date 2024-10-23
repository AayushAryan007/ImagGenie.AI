import mongoose, { Connection } from "mongoose";

interface MongooseConnection {
  isConnected?: number;
}

const connection: MongooseConnection = {};

// Establish connection to MongoDB
export async function connectToDatabase(): Promise<Connection | null> {
  if (connection.isConnected) {
    // If already connected, return the existing connection
    return mongoose.connection;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);

    connection.isConnected = db.connections[0].readyState;
    return db.connection;
  } catch (error) {
    console.error("Error connecting to database", error);
    return null;
  }
}
