"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import StatsCards from "./StatCard";
import AIInsights from "./AIInsights";
import RecentLeaves from "./RecentLeaves";
import AttendanceChart from "@/components/charts/AttendanceChart";
import PayrollChart from "@/components/charts/PayrollChart";
import EmployeeDepartmentChart from "@/components/charts/EmployeeDepartmentChart";
import LeaveChart from "@/components/charts/LeaveChart";


interface DashboardStats {
  total_employees: number;
  present_today: number;
  on_leave: number;
  payroll: number;
  total_salary: number;
}

const fallbackStats: DashboardStats = {
  total_employees:0,
  present_today: 0,
  on_leave: 0,
  payroll: 0,
  total_salary: 0,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(fallbackStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("access");

        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard-stats/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
          return;
        }

        console.log("Response Status:", response.status);

const data = await response.json();

console.log("Dashboard Data:", data);

if (response.ok) {
  setStats({ ...fallbackStats, ...data });
} else {
  console.log("Dashboard API Error");
}
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#020617] text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#030712_50%,_#01040d_100%)] p-6">

          <div className="mx-auto max-w-7xl space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="uppercase tracking-[0.3em] text-cyan-400 text-sm">
                    Owner Workspace
                  </p>

                  <h1 className="text-4xl font-bold mt-3">
                    WorkSphere AI Dashboard
                  </h1>

                  <p className="text-gray-400 mt-3 max-w-2xl">
                    Monitor employees, attendance, payroll,
                    leave management and AI insights in one place.
                  </p>

                </div>

                <div className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-5 py-2">
                  AI Active
                </div>

              </div>

            </motion.div>

            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <AIInsights 
  totalEmployees={stats.total_employees}
  presentToday={stats.present_today}
  onLeave={stats.on_leave}
  payroll={stats.payroll}
/> 
  <RecentLeaves />
  <div className="grid lg:grid-cols-2 gap-8 mt-10">

  <div className="bg-slate-900 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-4">
      Attendance
    </h2>

    <AttendanceChart
      present={stats.present_today}
      absent={
        stats.total_employees -
        stats.present_today -
        stats.on_leave
      }
      leave={stats.on_leave}
    />
  </div>

  <div className="bg-slate-900 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-4">
      Payroll
    </h2>

    <PayrollChart
      salary={stats.total_salary}
      bonus={100000}
      deductions={25000}
    />
  </div>

  <div className="bg-slate-900 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-4">
      Departments
    </h2>

    <EmployeeDepartmentChart
      labels={["HR","IT","Marketing","Finance"]}
      values={[3,6,2,1]}
    />
  </div>

  <div className="bg-slate-900 rounded-2xl p-6">
    <h2 className="text-2xl font-bold mb-4">
      Leave Status
    </h2>

    <LeaveChart
      approved={8}
      pending={2}
      rejected={1}
    />
  </div>

</div>
</div>

          </div>
        </main>
      </div>
    </div>
  );
}