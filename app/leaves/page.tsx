"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

interface Leave {
  id: number;
  employee: number;
  employee_name: string;
  reason: string;
  start_date: string;
  end_date: string;
  status: string;
}

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("access");

      console.log("Access Token:", token);

      const response = await fetch(
        "http://127.0.0.1:8000/api/leaves/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
  return;
}

      console.log("Status:", response.status);

const data = await response.json();

console.log("Leaves Data:", data);
console.log("Is Array:", Array.isArray(data));

if (Array.isArray(data)) {
  setLeaves(data);
} else if (Array.isArray(data.results)) {
  setLeaves(data.results);
} else {
  console.log("Unexpected response:", data);
  setLeaves([]);
}
    } catch (error) {
      console.error("Fetch Error:", error);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  const approveLeave = async (id: number) => {
  try {
    const token = localStorage.getItem("access");

    const res = await fetch(
      `http://127.0.0.1:8000/api/leaves/${id}/approve/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Approve Status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.log(text);
      alert("Approve failed");
      return;
    }

    fetchLeaves();
  } catch (error) {
    console.error(error);
  }
};

  const rejectLeave = async (id: number) => {
    try {
      const token = localStorage.getItem("access");

      await fetch(
        `http://127.0.0.1:8000/api/leaves/${id}/reject/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold mb-8">
            Leave Management
          </h1>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

            {loading ? (
              <div className="p-10 text-center">
                Loading...
              </div>
            ) : (

              <table className="w-full">

                <thead className="bg-slate-800">

                  <tr>
                    <th className="p-4 text-left">
                      Employee
                    </th>

                    <th className="p-4 text-left">
                      Reason
                    </th>

                    <th className="p-4 text-left">
                      Start Date
                    </th>

                    <th className="p-4 text-left">
                      End Date
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {leaves.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-gray-400"
                      >
                        No Leave Requests Found
                      </td>
                    </tr>
                  ) : (

                    leaves.map((leave) => (

                      <tr
                        key={leave.id}
                        className="border-b border-slate-800"
                      >
                        <td className="p-4">
                          {leave.employee_name}
                        </td>

                        <td className="p-4">
                          {leave.reason}
                        </td>

                        <td className="p-4">
                          {leave.start_date}
                        </td>

                        <td className="p-4">
                          {leave.end_date}
                        </td>

                        <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      leave.status === "Approved"
        ? "bg-green-500/20 text-green-400"
        : leave.status === "Rejected"
        ? "bg-red-500/20 text-red-400"
        : "bg-yellow-500/20 text-yellow-400"
    }`}
  >
    {leave.status}
  </span>
</td>

                        <td className="p-4">

  {leave.status === "Pending" ? (
    <>
      <button
        onClick={() => approveLeave(leave.id)}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg mr-2"
      >
        Approve
      </button>

      <button
        onClick={() => rejectLeave(leave.id)}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
      >
        Reject
      </button>
    </>
  ) : (
    <span className="text-gray-400 italic">
      Completed
    </span>
  )}

</td>
                      </tr>

                    ))
                  )}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}