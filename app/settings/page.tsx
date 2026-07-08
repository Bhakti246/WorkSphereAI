"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    company_name: "WorkSphere AI",
    email: "info@worksphere.ai",
    phone: "+91 9876543210",
    address: "Rajkot, Gujarat",
    currency: "INR",
    timezone: "Asia/Kolkata",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = () => {
    alert("Settings Saved Successfully");
  };

  return (
    <div className="min-h-screen flex bg-[#020617] text-white">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8">
            Company Settings
          </h1>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-6">

            <input
              name="company_name"
              value={settings.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full bg-slate-800 rounded-xl p-4"
            />

            <input
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="Company Email"
              className="w-full bg-slate-800 rounded-xl p-4"
            />

            <input
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full bg-slate-800 rounded-xl p-4"
            />

            <input
              name="address"
              value={settings.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full bg-slate-800 rounded-xl p-4"
            />

            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full bg-slate-800 rounded-xl p-4"
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>

            <select
              name="timezone"
              value={settings.timezone}
              onChange={handleChange}
              className="w-full bg-slate-800 rounded-xl p-4"
            >
              <option>Asia/Kolkata</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>

            <button
              onClick={saveSettings}
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold"
            >
              Save Settings
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}