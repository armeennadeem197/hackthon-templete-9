"use server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { client } from "./sanity"

export type AuthResult = {
  success: boolean
  message: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export async function signUp(formData: FormData): Promise<AuthResult> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required!" }
  }

  try {
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email })
    if (existingUser) {
      return { success: false, message: "User with this email already exists!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await client.create({
      _type: "user",
      name,
      email,
      password: hashedPassword,
    })

    return {
      success: true,
      message: "Signup successful!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    }
  } catch (error) {
    console.error("Signup Error:", error)
    return { success: false, message: "Something went wrong!" }
  }
}

export async function signIn(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required!" }
  }

  try {
    const user = await client.fetch(`*[_type == "user" && email == $email][0]`, { email })

    if (!user) {
      return { success: false, message: "Invalid email or password!" }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password!" }
    }

    // Set session cookie
    cookies().set("session", JSON.stringify({ id: user._id, name: user.name, email: user.email }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return {
      success: true,
      message: "Login successful!",
      user: { id: user._id, name: user.name, email: user.email },
    }
  } catch (error) {
    console.error("Signin Error:", error)
    return { success: false, message: "Something went wrong!" }
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value
  return session ? JSON.parse(session) : null
}

export async function signOut() {
  cookies().delete("session")
}
