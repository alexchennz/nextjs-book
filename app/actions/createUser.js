"use server";
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";
export default async function createUser(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!name || !email || !password) {
    return {
      error: "Please enter all fields",
    };
  }
  if(password.length < 8){
    return {
        error: "Password must be at least 8 characters",
      };
  }
  if(confirmPassword !== password){
    return {
        error: "Confirm password does not match",
      };
  }

  const { account } = await createAdminClient();
  try {
    await account.create(
        ID.unique(),
        email,
        password,
        name
    )
    return {
        success: true
    }
  } catch (error) {
    console.log('Registration error: ', error);
    return {
        error: 'could not register user'
    }
  }
}
