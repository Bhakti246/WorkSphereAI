"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Leave {
  id: number;
  employee: number;
  employee_name: string;
  reason: string;
  start_date: string;
  end_date: string;
  status: string;
}

export default function RecentLeaves() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await fetch(
        "http://127.0.0.1:8000/api/leaves/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        // Show latest 5 leave requests
        setLeaves(data.reverse().slice(0, 5));
      }
    } catch (error) {
      console.error("Leave Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl"
    >
      <h2 className="text-2xl font-bold mb-5">
        Recent Leave Requests
      </h2>

      {loading ? (
        <p className="text-gray-400">
          Loading...
        </p>
      ) : leaves.length === 0 ? (
        <p className="text-gray-400">
          No Leave Requests Found
        </p>
      ) : (
        <div className="space-y-4">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="rounded-xl bg-white/5 border border-white/10 p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">
                  {leave.employee_name || `Employee #${leave.employee}`}
                </h3>

                <p className="text-gray-400 text-sm">
                  {leave.reason}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  {leave.start_date} → {leave.end_date}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  leave.status === "Approved"
                    ? "bg-green-600"
                    : leave.status === "Rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {leave.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}