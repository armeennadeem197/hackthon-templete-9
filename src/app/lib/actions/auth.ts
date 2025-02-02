"use server"

import { createClient } from "@sanity/client"
import bcrypt from "bcryptjs"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

type AuthResult = {
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
    // Check if user already exists
    const existingUser = await client.fetch(`*[_type == "user" && email == $email][0]`, { email })
    if (existingUser) {
      return { success: false, message: "User with this email already exists!" }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user in Sanity
    const newUser = await client.create({
      _type: "user",
      name,
      email,
      password: hashedPassword,
    })

    console.log("User created successfully:", newUser)

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
    // Fetch the user from Sanity
    const user = await client.fetch(`*[_type == "user" && email == $email][0]`, { email })

    if (!user) {
      return { success: false, message: "Invalid email or password!" }
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password!" }
    }

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
