import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/app/lib/db"; // Import your MongoDB connection function
import User from "@/app/models/user"; // Import your User model

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
          console.log(user);
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
  session: {
    sessionCallback: async (session) => {;
      return Promise.resolve(session);
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.accessToken = token.accessToken
      
      return session
    }  
  },
  secret: process.env.NEXTAUTH_SECRET, // Your secret should be set in your environment variables
  pages: {
    signIn: "/", // Customize the sign-in page route as needed
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
