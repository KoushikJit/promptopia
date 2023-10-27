import User from "@models/users";
import { connectToDB } from "@utils/database";
import { NextAuthOptions, DefaultSession, Profile, Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GitHubProvider from "next-auth/providers/github";


export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;

      await createUserIfNotExist(user, profile);
      return true;
    },
    async session({ session, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // enrich from mongodb storage
      return await enrichFromMongoDB(user, session);
    },
  },
};

async function createUserIfNotExist(user: AdapterUser, profile: Profile) {
  console.log("createUserIfNotExist: "+ JSON.stringify(user));
  console.log(JSON.stringify("createUserIfNotExist: "+profile));
  await connectToDB();

  const existingUser = await User.findOne({ email: profile.email });
  if (!existingUser) {
    console.log("user doesnt exist!");
    User.create({
      username: profile?.email?.substring(0, profile.email.indexOf("@")),
      email: profile?.email,
      password: "OAuth",
      image: user?.image,
    });
  } else {
    console.log("user exists!");
  }
}

async function enrichFromMongoDB(user: AdapterUser, session: Session) {
  await connectToDB();
  const existingUser = await User.findOne({ email: session.user.email });

  session.user.email = existingUser.email;
  session.user.id= existingUser._id;
  // console.log("enrichFromMongoDB: " + existingUser);

  return session;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
