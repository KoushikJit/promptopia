import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

export const GET = NextAuth(authOptions);
// export { handler as GET, handler as POST };
