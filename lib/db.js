import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@mean.r3iag.mongodb.net/auth-demo?retryWrites=true&w=majority`
  );

  return client;
}

export default connectToDatabase;
