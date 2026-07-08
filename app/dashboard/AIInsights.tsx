"use client";

import { motion } from "framer-motion";

interface Props {
  totalEmployees?: number;
  presentToday?: number;
  onLeave?: number;
  payroll?: number;
}

export default function AIInsights({
  totalEmployees = 0,
  presentToday = 0,
  onLeave = 0,
  payroll = 0,
}: Props) {
  const insights = [
    {
      title: "Employees",
      message: `${totalEmployees} employees are registered.`,
    },
    {
      title: "Attendance",
      message: `${presentToday} employees are present today.`,
    },
    {
      title: "Leaves",
      message: `${onLeave} employees are currently on leave.`,
    },
    {
      title: "Payroll",
      message: `${payroll} payroll records available.`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"
    >
      <h2 className="text-2xl font-bold mb-5">
        AI Insights
      </h2>

      <div className="space-y-4">
        {insights.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <h3 className="text-cyan-400 font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-300 mt-2">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}