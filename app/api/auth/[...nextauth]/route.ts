import NextAuth from "next-auth/next";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID || "",
        clientSecret: process.env.NAVER_CLIENT_SECRET || ""
    }),
    
  ],




  pages: {
    signIn: "/auth/signin",
  },


});

export { handler as GET, handler as POST };