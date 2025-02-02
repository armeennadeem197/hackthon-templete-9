import { client } from "@/sanity/lib/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, name, bio, avatar, socialLinks } = req.body;

  try {
    const updatedUser = await client
      .patch(id) // Use the user's document ID
      .set({ name, bio, avatar, socialLinks })
      .commit();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
}