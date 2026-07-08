"use client";

import { useEffect, useState } from "react";

export default function RecentLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await fetch(
      "http://127.0.0.1:8000/api/leaves/"
    );

    const data = await res.json();

    setLeaves(data.slice(0, 5));
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-xl font-bold mb-4">
        Recent Leave Requests
      </h2>

      <div className="space-y-3">
        {leaves.map((leave: any) => (
          <div
            key={leave.id}
            className="flex justify-between"
          >
            <span>{leave.reason}</span>

            <span>{leave.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}