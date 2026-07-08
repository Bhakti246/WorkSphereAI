"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function ReportsPage() {
  return (
    <div className="min-h-screen flex bg-[#020617] text-white">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h1 className="text-5xl font-bold mb-10">
            Reports & Analytics
          </h1>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold mb-3">
                Employees
              </h2>

              <p className="text-gray-400 mb-6">
                Export complete employee information.
              </p>

              <button
  onClick={() =>
    window.open(
      "http://127.0.0.1:8000/api/reports/employees/",
      "_blank"
    )
  }
  className="..."
>
  Export Employees
</button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold mb-3">
                Attendance
              </h2>

              <p className="text-gray-400 mb-6">
                Download attendance records.
              </p>

              <button
  onClick={() =>
    window.open(
      "http://127.0.0.1:8000/api/reports/attendance/",
      "_blank"
    )
  }
  className="..."
>
  Export Attendance
</button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold mb-3">
                Leaves
              </h2>

              <p className="text-gray-400 mb-6">
                Export leave requests.
              </p>

              <button
  onClick={() =>
    window.open(
      "http://127.0.0.1:8000/api/reports/leaves/",
      "_blank"
    )
  }
  className="..."
>
  Export Leaves
</button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-2xl font-bold mb-3">
                Payroll
              </h2>

              <p className="text-gray-400 mb-6">
                Download payroll reports.
              </p>

              <button
  onClick={() =>
    window.open(
      "http://127.0.0.1:8000/api/reports/payroll/",
      "_blank"
    )
  }
  className="..."
>
  Export Payroll
</button>
            </div>

          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900 p-8">

            <h2 className="text-3xl font-bold mb-6">
              Report Filters
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <input
                type="date"
                className="bg-slate-800 rounded-xl p-4 outline-none"
              />

              <input
                type="date"
                className="bg-slate-800 rounded-xl p-4 outline-none"
              />

              <select className="bg-slate-800 rounded-xl p-4">
                <option>All Departments</option>
                <option>AI & DS</option>
                <option>HR</option>
                <option>Finance</option>
              </select>

            </div>

            <button className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-semibold">
              Generate Report
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}