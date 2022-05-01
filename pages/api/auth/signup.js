import { hashPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

//
async function handler(req, res) {
  const { email, password } = req.body;

  if (req.method === "POST") {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: "Invalid details" });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const hasedPassword = await hashPassword(password);

    const result = await db
      .collection("users")
      .insertOne({ email, password: hasedPassword });

    res.status(201).json({ message: "Signup successful", data: result });
  }
}

export default handler;
