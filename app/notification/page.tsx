"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Bell, CheckCircle, UserPlus, Calendar, CreditCard } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: <UserPlus className="text-blue-400" size={22} />,
    title: "New Employee Joined",
    message: "Bhakti Gajera has been added successfully.",
    time: "2 minutes ago",
  },
  {
    id: 2,
    icon: <Calendar className="text-yellow-400" size={22} />,
    title: "New Leave Request",
    message: "Smit Padaliya requested leave for 3 days.",
    time: "15 minutes ago",
  },
  {
    id: 3,
    icon: <CheckCircle className="text-green-400" size={22} />,
    title: "Attendance Marked",
    message: "Today's attendance has been updated.",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: <CreditCard className="text-purple-400" size={22} />,
    title: "Payroll Generated",
    message: "Payroll for July has been created.",
    time: "Today",
  },
];

export default function NotificationPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell size={38} />
            <h1 className="text-5xl font-bold">Notifications</h1>
          </div>

          <div className="space-y-5">
            {notifications.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex justify-between items-center hover:border-cyan-500 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-xl">
                    {item.icon}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-gray-400 mt-1">
                      {item.message}
                    </p>
                  </div>
                </div>

                <span className="text-gray-500 text-sm">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}