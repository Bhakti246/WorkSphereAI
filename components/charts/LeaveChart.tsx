"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  approved: number;
  pending: number;
  rejected: number;
}

export default function LeaveChart({
  approved,
  pending,
  rejected,
}: Props) {
  return (
    <Doughnut
      data={{
        labels: [
          "Approved",
          "Pending",
          "Rejected",
        ],
        datasets: [
          {
            data: [
              approved,
              pending,
              rejected,
            ],
            backgroundColor: [
              "#22c55e",
              "#f59e0b",
              "#ef4444",
            ],
          },
        ],
      }}
    />
  );
}