"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function PayrollPage() {
  const router = useRouter();

  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

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

    fetchPayrolls();
    fetchEmployees();
  }, [router]);

  const fetchPayrolls = async () => {
    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        "http://127.0.0.1:8000/api/payroll/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        localStorage.clear();
        router.push("/login");
        return;
      }

      const data = await res.json();

      console.log("Payroll Data:", data);

      setPayrolls(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = () => {
    const salary = Number(form.salary) || 0;
    const bonus = Number(form.bonus) || 0;
    const deductions = Number(form.deductions) || 0;

    return salary + bonus - deductions;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access");

      const res = await fetch(
        "http://127.0.0.1:8000/api/payroll/",
        {
          method: "POST",
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
        alert("Failed to create payroll");
        return;
      }

      setForm({
        employee: "",
        month: "",
        salary: "",
        bonus: "",
        deductions: "",
      });

      fetchPayrolls();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePayroll = async (id: number) => {
    try {
      const token = localStorage.getItem("access");

      await fetch(
        `http://127.0.0.1:8000/api/payroll/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPayrolls();
    } catch (err) {
      console.error(err);
    }
  };

  const getEmployeeName = (id: number) => {
    const employee = employees.find(
      (emp) => emp.id === id
    );

    return employee?.full_name || `Employee #${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
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
            Payroll Management
          </h1>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 mb-8">

            <h2 className="text-2xl font-semibold mb-6">
              Create Payroll
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-4"
            >
              <select
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.employee}
                onChange={(e) =>
                  setForm({
                    ...form,
                    employee: e.target.value,
                  })
                }
                required
              >
                <option value="">
                  Select Employee
                </option>

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
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-lg font-semibold"
              >
                Create Payroll
              </button>
            </form>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden">

            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-5 text-left">
                    Employee
                  </th>

                  <th className="p-5 text-left">
                    Month
                  </th>

                  <th className="p-5 text-left">
                    Salary
                  </th>

                  <th className="p-5 text-left">
                    Bonus
                  </th>

                  <th className="p-5 text-left">
                    Deductions
                  </th>

                  <th className="p-5 text-left">
                    Total
                  </th>

                  <th className="p-5 text-left">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {payrolls.map((payroll) => (
                  <tr
                    key={payroll.id}
                    className="border-b border-slate-800"
                  >
                    <td className="p-5">
                      {getEmployeeName(
                        payroll.employee
                      )}
                    </td>

                    <td className="p-5">
                      {payroll.month}
                    </td>

                    <td className="p-5">
                      ₹{payroll.salary}
                    </td>

                    <td className="p-5 text-green-400">
                      ₹{payroll.bonus}
                    </td>

                    <td className="p-5 text-red-400">
                      ₹{payroll.deductions}
                    </td>

                    <td className="p-5 font-bold">
                      ₹{payroll.total_salary}
                    </td>

                    <td className="p-5">
                      <button
  onClick={() => router.push(`/payroll/edit/${payroll.id}`)}
  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mr-2"
>
  Edit
</button>

<button
  onClick={() => deletePayroll(payroll.id)}
  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
>
  Delete
</button>
                    </td>
                  </tr>
                ))}

                {payrolls.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-10 text-center text-gray-400"
                    >
                      No Payroll Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>
  );
}