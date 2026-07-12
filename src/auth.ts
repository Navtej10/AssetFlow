import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });
        if (!user) return null;
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        
        if (passwordsMatch) {
          return { 
            id: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            departmentId: user.departmentId 
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as unknown as Record<string, unknown>).role;
        token.departmentId = (user as unknown as Record<string, unknown>).departmentId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as unknown as Record<string, unknown>).role = token.role;
        (session.user as unknown as Record<string, unknown>).departmentId = token.departmentId;
      }
      return session;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "assetflow_super_secret_key_for_development_and_erp_security_12345",
})
