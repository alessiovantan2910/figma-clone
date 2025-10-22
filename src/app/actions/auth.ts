"use server";

import { signUpSchema } from "~/schema";

export async function register(
    prevSate: string | undefined, 
    formData: FormData){
        try{
            const{email, password} = 
         await signUpSchema.parseAsync({
            email: formData.get("email") as String,
            password: formData.get("password")
         });  
        }catch(error){
                return "error"
        }
       
    }