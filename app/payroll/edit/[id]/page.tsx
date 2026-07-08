"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

interface Payroll {
  id: number;
  employee: number;
  month: string;
  salary: number;
  bonus: number;
  deductions: number;
  total_salary: number;
}

interface Employee {
  id: number;
  full_name: string;
}

export default function EditPayrollPage() {
  const router = useRouter();
  const params = useParams();

  const payrollId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [loading, setLoading] = useState(true);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [form, setForm] = useState({
    employee: "",
    month: "",
    salary: "",
    bonus: "",
    deductions: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      router.push("/login");
      return;
    }

    if (payrollId) {
      fetchEmployees();
      fetchPayroll();
    }
  }, [payrollId, router]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        "http://127.0.0.1:8000/api/employees/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("Employees:", data);

      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

    const fetchPayroll = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        `http://127.0.0.1:8000/api/payroll/${payrollId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await res.text();

console.log("Status:", res.status);
console.log("Response:", text);

if (!res.ok) {
  alert(`Status: ${res.status}\n${text}`);
  return;
}

const data: Payroll = JSON.parse(text);

      setForm({
        employee: String(data.employee),
        month: data.month,
        salary: String(data.salary),
        bonus: String(data.bonus),
        deductions: String(data.deductions),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const salary = Number(form.salary) || 0;
    const bonus = Number(form.bonus) || 0;
    const deductions = Number(form.deductions) || 0;

    return salary + bonus - deductions;
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        `http://127.0.0.1:8000/api/payroll/${payrollId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            employee: Number(form.employee),
            month: form.month,
            salary: Number(form.salary),
            bonus: Number(form.bonus),
            deductions: Number(form.deductions),
            total_salary: calculateTotal(),
          }),
        }
      );

      if (!res.ok) {
        alert("Failed to update payroll");
        return;
      }

      alert("Payroll updated successfully");
      router.push("/payroll");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading Payroll...
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
          <h1 className="text-5xl font-bold mb-8">
            Edit Payroll
          </h1>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

            <form
  onSubmit={handleUpdate}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>

                          <select
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.employee}
                onChange={(e) =>
                  setForm({
                    ...form,
                    employee: e.target.value,
                  })
                }
                required
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

              <input
                type="month"
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.month}
                onChange={(e) =>
                  setForm({
                    ...form,
                    month: e.target.value,
                  })
                }
                required
              />

              <input
                type="number"
                placeholder="Salary"
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.salary}
                onChange={(e) =>
                  setForm({
                    ...form,
                    salary: e.target.value,
                  })
                }
                required
              />

              <input
                type="number"
                placeholder="Bonus"
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.bonus}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bonus: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Deductions"
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.deductions}
                onChange={(e) =>
                  setForm({
                    ...form,
                    deductions: e.target.value,
                  })
                }
              />

              <div className="md:col-span-2 flex items-center text-xl font-bold mt-2">
                Total Salary: ₹{calculateTotal()}
              </div>

              <div className="flex gap-4">

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg font-semibold"
                >
                  Update Payroll
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/payroll")}
                  className="bg-gray-600 hover:bg-gray-700 transition px-6 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>

              </div>

                        </form>

          </div>

        </div>

      </div>

    </div>

  );
}