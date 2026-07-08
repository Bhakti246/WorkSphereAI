"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-5xl font-bold mb-10">
            My Profile
          </h1>

          <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-10">

            <div className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full bg-slate-700 flex items-center justify-center text-6xl">
                👤
              </div>

              <h2 className="text-3xl font-bold mt-5">
                Admin
              </h2>

              <p className="text-gray-400">
                admin@worksphere.ai
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <input
                className="bg-slate-800 p-4 rounded-xl"
                defaultValue="Admin"
              />

              <input
                className="bg-slate-800 p-4 rounded-xl"
                defaultValue="admin@worksphere.ai"
              />

              <input
                className="bg-slate-800 p-4 rounded-xl"
                defaultValue="+91 9876543210"
              />

              <input
                className="bg-slate-800 p-4 rounded-xl"
                defaultValue="Super Admin"
              />

            </div>

            <div className="flex gap-5 mt-10">

              <button className="bg-cyan-600 px-6 py-3 rounded-xl">
                Save Profile
              </button>

              <button className="bg-red-600 px-6 py-3 rounded-xl">
                Change Password
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}