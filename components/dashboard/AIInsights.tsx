"use client";

import { useEffect, useState } from "react";

interface Stats {
  total_employees: number;
  present_today: number;
  on_leave: number;
  payroll: number;
  total_salary: number;
}

export default function AIInsights() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard-stats/"
      );

      const data = await response.json();

      console.log("Dashboard Stats:", data);

      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h2 className="text-xl font-bold mb-4">
          AI Insights
        </h2>

        <p className="text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <h2 className="text-xl font-bold mb-4">
          AI Insights
        </h2>

        <p className="text-red-400">
          Failed to load dashboard data
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        AI Insights
      </h2>

      <div className="space-y-4 text-lg">
        <p>
          👥 Total Employees:
          <span className="font-bold ml-2 text-blue-400">
            {stats.total_employees}
          </span>
        </p>

        <p>
          ✅ Present Today:
          <span className="font-bold ml-2 text-green-400">
            {stats.present_today}
          </span>
        </p>

        <p>
          🏖️ On Leave:
          <span className="font-bold ml-2 text-yellow-400">
            {stats.on_leave}
          </span>
        </p>

        <p>
          💰 Payroll Records:
          <span className="font-bold ml-2 text-purple-400">
            {stats.payroll}
          </span>
        </p>

        <p>
          ₹ Total Salary:
          <span className="font-bold ml-2 text-emerald-400">
            ₹{stats.total_salary.toLocaleString()}
          </span>
        </p>

        <div className="border-t border-white/10 pt-4 mt-4">
          <p className="text-sm text-gray-400">
            AI Summary:
          </p>

          <ul className="mt-3 space-y-2 text-gray-300">
            <li>
              • Company currently has{" "}
              {stats.total_employees} employees.
            </li>

            <li>
              • {stats.present_today} employees are
              marked present.
            </li>

            <li>
              • {stats.on_leave} employees are on
              approved leave.
            </li>

            <li>
              • {stats.payroll} payroll records have
              been generated.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}