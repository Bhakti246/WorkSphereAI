"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployee() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    phone: "",
    department: "",
    gender: "Male",
    salary: "",
    joining_date: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(
      ([key, value]) => {
        data.append(key, value);
      }
    );

    if (photo) {
      data.append("photo", photo);
    }

    const API = process.env.NEXT_PUBLIC_API_URL;

const response = await fetch(`${API}/api/employees/`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
  body: data,
});

    if (response.ok) {
  alert("Employee Added Successfully");
  router.push("/employees");
} else {
  const error = await response.json();

  console.log("Backend Error:", error);

  alert(JSON.stringify(error, null, 2));
}
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Add Employee
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >
        <input
          placeholder="Employee ID"
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              employee_id: e.target.value,
            })
          }
        />

        <input
          placeholder="Full Name"
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              full_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Department"
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              department: e.target.value,
            })
          }
        />

        <select
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              gender: e.target.value,
            })
          }
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="number"
          placeholder="Salary"
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              salary: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="w-full p-3 rounded bg-white/10"
          onChange={(e) =>
            setFormData({
              ...formData,
              joining_date: e.target.value,
            })
          }
        />

        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) =>
            setPhoto(
              e.target.files
                ? e.target.files[0]
                : null
            )
          }
        />

        <button
          type="submit"
          className="bg-blue-600 px-6 py-3 rounded-xl"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}