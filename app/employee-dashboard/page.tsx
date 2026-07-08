"use client";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import {
  User,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  Download,
} from "lucide-react";

export default function EmployeeDashboardPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h1 className="text-5xl font-bold mb-8">
            Employee Portal
          </h1>

          {/* Profile */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex items-center gap-8">

            <div className="w-28 h-28 rounded-full bg-slate-700 flex items-center justify-center">
              <User size={50} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Bhakti Gajera
              </h2>

              <p className="text-gray-400">
                AI Developer
              </p>

              <p className="text-cyan-400 mt-2">
                Employee ID : EMP006
              </p>
            </div>

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <Calendar className="text-cyan-400 mb-4" size={35} />

              <h3 className="text-gray-400">
                Attendance
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                26
              </h1>

              <p className="text-green-400 mt-2">
                Days Present
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <Clock className="text-yellow-400 mb-4" size={35} />

              <h3 className="text-gray-400">
                Leave Balance
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                8
              </h1>

              <p className="text-green-400 mt-2">
                Days Remaining
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <CreditCard className="text-green-400 mb-4" size={35} />

              <h3 className="text-gray-400">
                Salary
              </h3>

              <h1 className="text-3xl font-bold mt-2">
                ₹60,000
              </h1>

              <p className="text-cyan-400 mt-2">
                This Month
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <FileText className="text-purple-400 mb-4" size={35} />

              <h3 className="text-gray-400">
                Performance
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                A+
              </h1>

              <p className="text-green-400 mt-2">
                Excellent
              </p>
            </div>

          </div>

          {/* Quick Actions */}

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <Link href="/leaves">
  <button className="w-full bg-cyan-600 hover:bg-cyan-700 rounded-2xl p-6 text-xl font-semibold">
    Apply Leave
  </button>
</Link>

<Link href="/attendance">
  <button className="w-full bg-green-600 hover:bg-green-700 rounded-2xl p-6 text-xl font-semibold">
    View Attendance
  </button>
</Link>

<Link href="/payroll">
  <button className="w-full bg-purple-600 hover:bg-purple-700 rounded-2xl p-6 text-xl font-semibold flex justify-center items-center gap-3">
    <Download size={22} />
    Download Payslip
  </button>
</Link>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}