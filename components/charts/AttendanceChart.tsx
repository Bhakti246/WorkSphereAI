"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Props {
  present: number;
  absent: number;
  leave: number;
}

export default function AttendanceChart({
  present,
  absent,
  leave,
}: Props) {
  return (
    <Bar
      data={{
        labels: ["Present", "Absent", "Leave"],
        datasets: [
          {
            label: "Employees",
            data: [present, absent, leave],
            backgroundColor: [
              "#22c55e",
              "#ef4444",
              "#eab308",
            ],
          },
        ],
      }}
    />
  );
}