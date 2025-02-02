"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  socialLinks?: { platform: string; url: string }[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from Sanity
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await fetch("/api/user/profile");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error(error.message);
      alert("Error updating profile: " + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto max-w-md py-16">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      {user ? (
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Bio</label>
            <textarea
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
              className="w-full border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          >
            Update Profile
          </button>
        </form>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
}