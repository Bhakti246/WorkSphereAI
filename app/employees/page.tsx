"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Employee {
  id: number;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  salary: string;
  photo: string | null;
}

export default function EmployeesPage() {

  const API = process.env.NEXT_PUBLIC_API_URL;

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API}/api/employees/`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const deleteEmployee = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      const response = await
       fetch(`${API}/api/employees/${id}/`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

      if (response.ok) {
        alert("Employee deleted successfully");
        fetchEmployees();
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting employee");
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      employee.department
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Employees
        </h1>

        <Link href="/employees/add">
          <button className="bg-blue-600 px-5 py-3 rounded-xl hover:bg-blue-700">
            Add Employee
          </button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-4 mb-6 rounded-xl bg-white/5 border border-white/10"
      />

      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left">
                Photo
              </th>

              <th className="p-4 text-left">
                Employee ID
              </th>

              <th className="p-4 text-left">
                Full Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Department
              </th>

              <th className="p-4 text-left">
                Salary
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map(
              (employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="p-4">
                    {employee.photo ? (
                      <img
                        src={employee.photo}
                        alt={
                          employee.full_name
                        }
                        className="w-16 h-16 rounded-full object-cover border border-white/20"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                        👤
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    {employee.employee_id}
                  </td>

                  <td className="p-4">
                    {employee.full_name}
                  </td>

                  <td className="p-4">
                    {employee.email}
                  </td>

                  <td className="p-4">
                    {employee.department}
                  </td>

                  <td className="p-4">
                    ₹{employee.salary}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 flex-wrap">

                      <Link
                        href={`/employees/${employee.id}`}
                      >
                        <button className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700">
                          View
                        </button>
                      </Link>

                      <Link
                        href={`/employees/edit/${employee.id}`}
                      >
                        <button className="bg-yellow-500 text-black px-3 py-1 rounded-lg hover:bg-yellow-600">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          deleteEmployee(
                            employee.id
                          )
                        }
                        className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {filteredEmployees.length ===
          0 && (
          <div className="text-center p-8 text-gray-400">
            No employees found
          </div>
        )}
      </div>
    </div>
  );
}