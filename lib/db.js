import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://sudu:93rKXBUV4oQqXpP2@cluster0.ntrwp.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
