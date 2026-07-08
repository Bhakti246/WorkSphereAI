"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

interface Props {
  salary: number;
  bonus: number;
  deductions: number;
}

export default function PayrollChart({
  salary,
  bonus,
  deductions,
}: Props) {
  return (
    <Bar
      data={{
        labels: ["Salary", "Bonus", "Deductions"],
        datasets: [
          {
            data: [salary, bonus, deductions],
            backgroundColor: [
              "#3b82f6",
              "#22c55e",
              "#ef4444",
            ],
          },
        ],
      }}
    />
  );
}