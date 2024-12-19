import { MongoClient, Db } from 'mongodb';

// MongoDB connection string and database name
const client = new MongoClient('mongodb://root:root@localhost:27017');
const dbName = 'document_analyzer';

// TypeScript declaration for global._mongoClientPromise
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

// Handle MongoDB connection
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent opening a new connection on every hot reload
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, just use the default promise
  clientPromise = client.connect();
}

// Return the database client
export const getClient = async (): Promise<Db> => {
  const clientInstance = await clientPromise;
  return clientInstance.db(dbName);
};
