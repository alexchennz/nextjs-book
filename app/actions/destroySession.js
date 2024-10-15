"use server";
import { createSessionClient } from "@/config/appwrite"
import { cookies } from "next/headers";
export default async function destroySession() {
  const sessionCookie = cookies().get("appwrite-session");

  if(!sessionCookie){
    return {
      error: 'No session cookie found'
    }
  }

  
  try {
    const {account} = await createSessionClient(sessionCookie.value);
    // delete session
    await account.deleteSession('current');

    // delete cookie
    cookies().delete("appwrite-session");

    return {
        success: true
    }
  } catch (error) {
    return {
        error: 'Invalid Credentials'
    }
  }
}
