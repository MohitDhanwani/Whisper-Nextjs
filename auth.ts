import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import db from "@/app/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            
            
            if (account?.provider === "google") {
                const email = user.email;

                if (!email) {
                    return false;
                }

                const userDB = await db.userDetails.findFirst({
                    where: {
                        userEmail: email,
                    }
                })

                if (userDB) {
                    return true;
                }

                await db.userDetails.create({
                    data:{
                        userName: user.name ?? "",
                        userEmail: email,
                        isReceivingMessages: false,
                    }
                });

                return true;


            }
            return false;
        }
    }
})