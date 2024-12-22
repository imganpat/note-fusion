import { z } from "zod";

const signUpSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email." })
    .email({ message: "Invalid email address." }),

  username: z
    .string({ required_error: "Please enter your username." })
    .trim()
    .min(3, { message: "Username must be atleast of 3 characters." }),

  password: z
    .string({ required_error: "Please enter the password." })
    .trim()
    .min(6, { message: "Password must be atleast of 6 characters." }),
});

export default signUpSchema;
