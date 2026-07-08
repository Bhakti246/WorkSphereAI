"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

interface Attendance {
  id: number;
  employee: number;
  employee_name: string;
  date: string;
  status: string;
  check_in: string | null;
  check_out: string | null;
  working_hours: string;
  overtime_hours: string;
  remarks: string;
}

export default function AttendancePage() {
  const router = useRouter();

  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://127.0.0.1:8000/api/attendance/", {
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
          setAttendance(data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  const deleteAttendance = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("access");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/attendance/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setAttendance((prev) =>
          prev.filter((item) => item.id !== id)
        );

        alert("Attendance deleted successfully.");
      } else {
        alert("Delete failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading Attendance...
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
              Attendance Management
            </h1>

            <button
              onClick={() => router.push("/attendance/add")}
              className="rounded-xl bg-cyan-600 hover:bg-cyan-700 px-6 py-3 font-semibold"
            >
              + Add Attendance
            </button>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">

            <table className="w-full">

              <thead className="bg-white/10">

                <tr>
                  <th className="p-5 text-left">Employee</th>
                  <th className="p-5 text-left">Date</th>
                  <th className="p-5 text-left">Status</th>
                  <th className="p-5 text-left">Check In</th>
                  <th className="p-5 text-left">Check Out</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>

              </thead>

              <tbody>

                {attendance.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-slate-800 hover:bg-white/5 transition"
                  >

                    <td className="p-5">
                      {item.employee_name}
                    </td>

                    <td className="p-5">
                      {item.date}
                    </td>

                    <td className="p-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          item.status === "Present"
                            ? "bg-green-600"
                            : item.status === "Late"
                            ? "bg-yellow-600"
                            : item.status === "Half Day"
                            ? "bg-orange-600"
                            : "bg-red-600"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="p-5">
                      {item.check_in || "-"}
                    </td>

                    <td className="p-5">
                      {item.check_out || "-"}
                    </td>

                    <td className="p-5">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            router.push(`/attendance/edit/${item.id}`)
                          }
                          className="rounded-lg bg-cyan-600 px-4 py-2 hover:bg-cyan-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteAttendance(item.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {attendance.length === 0 && (
              <div className="p-10 text-center text-gray-400">
                No Attendance Records Found
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}