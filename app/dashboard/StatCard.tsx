"use client";

import { motion } from "framer-motion";

interface DashboardStats {
  total_employees: number;
  present_today: number;
  on_leave: number;
  payroll: number;
}

interface Props {
  stats: DashboardStats;
}

export default function StatsCards({ stats }: Props) {
  const cards = [
    {
      title: "Employees",
      value: stats.total_employees,
      color: "text-cyan-400",
    },
    {
      title: "Present Today",
      value: stats.present_today,
      color: "text-green-400",
    },
    {
      title: "On Leave",
      value: stats.on_leave,
      color: "text-yellow-400",
    },
    {
      title: "Payroll Records",
      value: stats.payroll,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl"
        >
          <p className="text-gray-400">{card.title}</p>

          <h2 className={`text-4xl font-bold mt-4 ${card.color}`}>
            {card.value}
          </h2>
        </motion.div>
      ))}
    </div>
  );
}