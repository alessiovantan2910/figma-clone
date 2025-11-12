"use server";

import { ZodError } from "zod";
import { signUpSchema } from "~/schema";
import {db} from '~/server/db'
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "~/server/auth";
import { AuthError } from "next-auth";


export async function signout(){
await signOut();
}

export async function authenticate(
   prevSate: string | undefined, 
   formData: FormData){
      try{
         await signIn("credentials", formData)
      }catch(error){
         if (error instanceof AuthError){
            switch (error.type){
               case "CredentialsSignin":
                  return "無効なアカウントです。"
               default:
                  return "エラーが発生しました。"
            }
        }
        throw error;
      } 
   }

export async function register(
    prevSate: string | undefined, 
    formData: FormData){
        try{
            const{email, password} = 
         await signUpSchema.parseAsync({
            email: formData.get("email"),
            password: formData.get("password")
         });  

         const user  = await db.user.findUnique({
            where:{
                email: email
            }
         })

         if(user){
            return "ユーザーが既に登録してます。"
         }

         const hash = await bcrypt.hash(password, 8)

         await db.user.create({
            data: {
                email: email,
                password: hash,
            }
         })

        }catch(error){
                if (error instanceof ZodError){
                    return error.errors.map((error) => error.message).join(",");
                }
        }
       redirect("/signin") 
    }