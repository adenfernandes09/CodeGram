import * as z from "zod"

export const SignupValidation= z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  })

  export const SigninValidation= z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  })

  export const PostValidation= z.object({
    caption: z.string().min(5, {message: "Please enter a caption longer than 5 characters"}).max(2200, {message: "Cannot exceed 2200 characters"}),
    file: z.custom<File[]>(),
    location: z.string().min(2, {message:  "Please enter a location"}).max(1000 , {message: "Location cannot exceed 1000 characters"}),
    tags: z.string()
  })