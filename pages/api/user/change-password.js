import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const userEmail = session.user.email;
  const { oldPassword, newPassword } = req.body;

  const client = await connectToDatabase();
  const userCollection = client.db().collection("users");
  const foundUser = await userCollection.findOne({ email: userEmail });

  if (!foundUser) {
    client.close();
    res.status(404).json({ message: "User not found" });
    return;
  }

  const currentPassword = foundUser.password;
  console.log(oldPassword)

  const passwordIsEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordIsEqual) {
    client.close();
    res.status(403).json({ message: "You are not authorized this operation" });
    return;
  }

  const hashedNewPassword = await hashPassword(newPassword);

  const updatedUser = await userCollection.updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedNewPassword,
      },
    }
  );

  client.close();

  res.status(200).json({ message: "Password updated" });
}
