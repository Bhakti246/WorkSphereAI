"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditLeavePage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employee: "",
    reason: "",
    start_date: "",
    end_date: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchEmployees();
    fetchLeave();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/employees/");

      if (res.ok) {
        const data = await res.json();
        setEmployees(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeave = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/leaves/${id}/`
      );

      if (res.ok) {
        const data = await res.json();

        setFormData({
          employee: data.employee,
          reason: data.reason,
          start_date: data.start_date,
          end_date: data.end_date,
          status: data.status,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateLeave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/leaves/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Leave updated successfully");
        router.push("/leaves");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Edit Leave
        </h1>

        <form
          onSubmit={updateLeave}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2">
              Employee
            </label>

            <select
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3"
              value={formData.employee}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  employee: e.target.value,
                })
              }
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option
                  key={emp.id}
                  value={emp.id}
                >
                  {emp.full_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Reason
            </label>

            <textarea
              rows={5}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3"
              value={formData.reason}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reason: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block mb-2">
                Start Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    start_date: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2">
                End Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    end_date: e.target.value,
                  })
                }
              />
            </div>

          </div>

          <div>
            <label className="block mb-2">
              Status
            </label>

            <select
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-3"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl"
            >
              Update Leave
            </button>

            <button
              type="button"
              onClick={() => router.push("/leaves")}
              className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}