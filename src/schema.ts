import {string ,object} from "zod";


export const signUpSchema = object({
    email: string({required_error: "メールアドレスが必要"}).email("メールが無効"),
    password: string({required_error:"パスワードが必要"})
    .min(8, "パスワードの文字は少なきとも８文字で設定してください")
    .max(32,"最大32文字で設定してください")
})

export const signInSchema = object({
    email: string({required_error: "メールアドレスが必要"}).email("メールが無効"),
    password: string({required_error:"パスワードが必要"})
})