import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectMongoDB from "./path/to/connectMongoDB"; // Import your MongoDB connection function
import User from "./path/to/UserModel"; // Import your User model

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Invalid password");
          }

          // If credentials are valid, return the user object
          return Promise.resolve(user);
        } catch (error) {
          console.error("Authentication error:", error.message);
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
