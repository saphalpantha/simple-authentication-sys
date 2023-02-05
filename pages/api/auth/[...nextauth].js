import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { validatePassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db"
import FacebookProvider from "next-auth/providers/facebook"
export default NextAuth({
    session:{
      jwt:true,
    },
    providers:[ 


        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
            
        })
        ,

        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET
        }),

        FacebookProvider({
            clientId: process.env.META_CLIENT_ID,
            clientSecret: process.env.META_CLIENT_SECRET,
          }),
        CredentialsProvider({
            // credentials:{

            // }
            async authorize(credentials){
                const client = await connectToDataBase();
                const userCollection = client.db().collection('users');
                const user = await userCollection.findOne({email:credentials.email});
                const isValid = await  validatePassword(credentials.password, user.password);  
                if(!isValid){
                    client.close();
                    throw new Error('Could not login');
                }
                client.close();
                return{
                    email:user.email,
                }
            }
        })
    ]
})