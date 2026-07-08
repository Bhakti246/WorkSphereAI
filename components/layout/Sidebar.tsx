"use client";

import Link from "next/link";
import { FileText, User } from "lucide-react";
import { Settings } from "lucide-react";
import { Bell } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-white/5 border-r border-white/10 backdrop-blur-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">
          WorkSphere AI
        </h1>
      </div>

      <nav className="px-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/employees"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
        >
          <Users size={20} />
          <span>Employees</span>
        </Link>

        <Link
          href="/attendance"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
        >
          <Calendar size={20} />
          <span>Attendance</span>
        </Link>

        <Link
          href="/payroll"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
        >
          <CreditCard size={20} />
          <span>Payroll</span>
        </Link>

        <Link
  href="/reports"
  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
>
  <FileText size={20} />
  <span>Reports</span>
</Link>

<Link
  href="/settings"
  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
>
  <Settings size={20} />
  <span>Settings</span>
</Link>

<Link
  href="/profile"
  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
>
  <User size={20} />
  <span>Profile</span>
</Link>

<Link
  href="/notification"
  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
>
  <Bell size={20} />
  <span>Notifications</span>
</Link>

      </nav>
    </aside>
  );
}