"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("access");

const response = await fetch(
  `http://127.0.0.1:8000/api/employees/${id}/`,
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

    if (!response.ok) {
      throw new Error("Employee not found");
    }

      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!employee) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">

      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8">

        <div className="flex flex-col items-center">

          {employee.photo ? (
            <img
              src={employee.photo}
              alt={employee.full_name}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center text-6xl">
              👤
            </div>
          )}

          <h1 className="text-4xl font-bold mt-6">
            {employee.full_name}
          </h1>

          <p className="text-gray-400">
            {employee.department}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>
            <p className="text-gray-400">
              Employee ID
            </p>

            <h3 className="text-xl">
              {employee.employee_id}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Email
            </p>

            <h3 className="text-xl">
              {employee.email}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Phone
            </p>

            <h3 className="text-xl">
              {employee.phone}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Gender
            </p>

            <h3 className="text-xl">
              {employee.gender}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Salary
            </p>

            <h3 className="text-xl text-green-400">
              ₹{employee.salary}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Joining Date
            </p>

            <h3 className="text-xl">
              {employee.joining_date}
            </h3>
          </div>

        </div>

        <div className="flex gap-4 mt-10">

          <Link
            href={`/employees/edit/${employee.id}`}
          >
            <button className="bg-yellow-500 text-black px-5 py-3 rounded-xl">
              Edit Employee
            </button>
          </Link>

          <Link href="/employees">
            <button className="bg-gray-700 px-5 py-3 rounded-xl">
              Employee List
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}