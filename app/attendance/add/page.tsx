"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Employee {
  id: number;
  full_name: string;
}

export default function AddAttendancePage() {
  const router = useRouter();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    check_in: "",
    check_out: "",
    remarks: "",
    status: "Present",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/employees/"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
      setEmployees([]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/attendance/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        alert(err);
        return;
      }

      alert("Attendance added successfully");

      router.push("/attendance");
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#030712_50%,_#01040d_100%)] px-4 py-8 text-white">

      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-xl">

        <h1 className="text-4xl font-bold mb-8">
          Add Attendance
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2">
              Employee
            </label>

            <select
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
              value={formData.employee}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employee: e.target.value,
                })
              }
            >
              <option value="">
                Select Employee
              </option>

              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.full_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2">
              Check In
            </label>

            <input
              type="time"
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
              value={formData.check_in}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  check_in: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2">
              Check Out
            </label>

            <input
              type="time"
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
              value={formData.check_out}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  check_out: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2">
              Status
            </label>

            <select
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
            >
              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>

              <option value="Late">
                Late
              </option>

              <option value="Half Day">
                Half Day
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Remarks
            </label>

            <textarea
              rows={4}
              className="w-full rounded-xl bg-white/5 border border-white/10 p-3"
              value={formData.remarks}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  remarks: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Attendance"}
          </button>
        </form>
      </div>
    </div>
  );
}