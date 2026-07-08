"use client";

import { useEffect, useState } from "react";

export default function RecentPayrolls() {
  const [payrolls, setPayrolls] =
    useState([]);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    const res = await fetch(
      "http://127.0.0.1:8000/api/payroll/"
    );

    const data = await res.json();

    setPayrolls(data.slice(0, 5));
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Payrolls
      </h2>

      <div className="space-y-3">
        {payrolls.map((payroll: any) => (
          <div
            key={payroll.id}
            className="flex justify-between"
          >
            <span>
              Employee #{payroll.employee}
            </span>

            <span>
              ₹{payroll.total_salary}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}