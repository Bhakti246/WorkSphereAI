"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

interface Leave {
  id: number;
  employee_name: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
  reason: string;
  approved_by: string;
  created_at: string;
}

export default function LeaveDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const [leave, setLeave] = useState<Leave | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/leaves/${params.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          router.push("/login");
          return null;
        }

        return res.json();
      })
      .then((data) => {
        if (data) {
          setLeave(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const updateStatus = async (status: string) => {
    const token = localStorage.getItem("access");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/leaves/${params.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      if (!response.ok) {
        alert("Failed to update status");
        return;
      }

      setLeave((prev) =>
        prev
          ? {
              ...prev,
              status,
            }
          : prev
      );

      alert(`Leave ${status}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading Leave...
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Leave not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden">

      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[180px]" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[180px]" />

      <Sidebar />

      <div className="flex-1 relative z-10">
        <Navbar />

        <div className="p-8">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-5xl font-bold">
              Leave Details
            </h1>

            <button
              onClick={() => router.back()}
              className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl"
            >
              ← Back
            </button>

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">

            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <p className="text-gray-400 mb-1">Employee</p>
                <p className="text-xl font-semibold">
                  {leave.employee_name}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Leave Type</p>
                <p className="text-xl font-semibold">
                  {leave.leave_type}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Start Date</p>
                <p className="text-xl">
                  {leave.start_date}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">End Date</p>
                <p className="text-xl">
                  {leave.end_date}
                </p>
              </div>

              <div>
                <p className="text-gray-400 mb-1">Status</p>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      leave.status === "Approved"
                        ? "bg-green-600"
                        : leave.status === "Rejected"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                    }`}
                >
                  {leave.status}
                </span>

              </div>

              <div>
                <p className="text-gray-400 mb-1">Approved By</p>
                <p className="text-xl">
                  {leave.approved_by || "-"}
                </p>
              </div>

              <div className="md:col-span-2">

                <p className="text-gray-400 mb-2">
                  Reason
                </p>

                <div className="rounded-2xl bg-slate-900 border border-slate-700 p-5">
                  {leave.reason}
                </div>

              </div>

              <div>
                <p className="text-gray-400 mb-1">
                  Applied On
                </p>

                <p>
                  {new Date(
                    leave.created_at
                  ).toLocaleString()}
                </p>
              </div>

            </div>

            <div className="flex gap-4 mt-10 flex-wrap">

              <button
                onClick={() =>
                  router.push(`/leaves/edit/${leave.id}`)
                }
                className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => updateStatus("Approved")}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus("Rejected")}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
              >
                Reject
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}