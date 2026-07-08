"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Employee {
  id: number;
  full_name: string;
}

export default function EditAttendancePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([]);

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
    fetchAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/employees/"
      );

      if (!response.ok) throw new Error();

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/attendance/${id}/`
      );

      if (!response.ok) {
        alert("Attendance not found");
        router.push("/attendance");
        return;
      }

      const data = await response.json();

      setFormData({
        employee: String(data.employee),
        date: data.date || "",
        check_in: data.check_in || "",
        check_out: data.check_out || "",
        remarks: data.remarks || "",
        status: data.status || "Present",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/attendance/${id}/`,
        {
          method: "PUT",
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

      alert("Attendance updated successfully");

      router.push("/attendance");
    } catch (error) {
      console.error(error);
      alert("Failed to update attendance");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading Attendance...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#030712_50%,_#01040d_100%)] px-4 py-8 text-white">

      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-xl">

        <h1 className="mb-8 text-4xl font-bold">
          Edit Attendance
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block">
              Employee
            </label>

            <select
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
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
            <label className="mb-2 block">
              Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
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
            <label className="mb-2 block">
              Check In
            </label>

            <input
              type="time"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
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
            <label className="mb-2 block">
              Check Out
            </label>

            <input
              type="time"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
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
            <label className="mb-2 block">
              Status
            </label>

            <select
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
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
            <label className="mb-2 block">
              Remarks
            </label>

            <textarea
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
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
            disabled={saving}
            className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {saving
              ? "Updating..."
              : "Update Attendance"}
          </button>
        </form>
      </div>
    </div>
  );
}