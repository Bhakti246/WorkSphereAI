"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  labels: string[];
  values: number[];
}

export default function EmployeeDepartmentChart({
  labels,
  values,
}: Props) {
  return (
    <Pie
      data={{
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#3b82f6",
              "#22c55e",
              "#f59e0b",
              "#ef4444",
              "#8b5cf6",
            ],
          },
        ],
      }}
    />
  );
}