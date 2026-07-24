import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'super_secret_portfolio_key_2026',
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/admin/login',
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email as string },
                })
                if (!admin) return null

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    admin.passwordHash
                )
                if (!isValid) return null

                return { id: admin.id, email: admin.email }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.id = user.id
            return token
        },
        session({ session, token }) {
            if (session.user) (session.user as any).id = token.id
            return session
        },
    },
})