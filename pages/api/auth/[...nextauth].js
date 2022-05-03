import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const userExists = await client.db().collection('users').findOne({ email: credentials.email});

        const isValid = await verifyPassword(
          credentials.password,
          userExists.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Wrong password");
        }
        client.close();
        return { email: userExists.email };
      },
    }),
  ],
});
