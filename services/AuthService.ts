'use server';

import { User } from "@/types";
import bcrypt from "bcryptjs";
import {prisma} from "@/prisma/client";

const getUserByEmail = async (email: string | null) => {
  if(!email) return null;
  const user = await prisma.user.findFirst({ where: { email } });
  return user;
};

const validateUser = async (user: User | null, password: string) => {
    if (!user) throw new Error("Email not found");

    const passwordMatch = await bcrypt.compare(password, user.password??""); // TODO: handle oauth case where no password

    if (!passwordMatch) throw new Error("Incorrect Password");
    return true;
};

const signup = async (user: User) => {
  const existingUser = await getUserByEmail(user.email);
  if(existingUser) return {ok: false, message: "Email already in use"};

  // TODO: handle oauth case where no password
  const hashedPassword = await bcrypt.hash(user.password??"", 12);
  user.password = hashedPassword;

  const createdUser = await prisma.user.create({
    data: user
  });

  if(createdUser) return {ok: true, message: "Signup successful"};
  return {ok: false, message: "Error in signup"};
}

export { getUserByEmail, validateUser, signup };
