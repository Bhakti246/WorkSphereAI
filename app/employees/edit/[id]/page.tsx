
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState<File | null>(null);

  const [employee, setEmployee] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    phone: "",
    department: "",
    gender: "Male",
    salary: "",
    joining_date: "",
  });

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/employees/${id}/`
      );

      const data = await response.json();

      setEmployee({
        employee_id: data.employee_id || "",
        full_name: data.full_name || "",
        email: data.email || "",
        phone: data.phone || "",
        department: data.department || "",
        gender: data.gender || "Male",
        salary: data.salary || "",
        joining_date: data.joining_date || "",
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "employee_id",
        employee.employee_id
      );

      formData.append(
        "full_name",
        employee.full_name
      );

      formData.append(
        "email",
        employee.email
      );

      formData.append(
        "phone",
        employee.phone
      );

      formData.append(
        "department",
        employee.department
      );

      formData.append(
        "gender",
        employee.gender
      );

      formData.append(
        "salary",
        employee.salary
      );

      formData.append(
        "joining_date",
        employee.joining_date
      );

      if (photo) {
        formData.append(
          "photo",
          photo
        );
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/employees/${id}/`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (response.ok) {
        alert(
          "Employee Updated Successfully"
        );

        router.push("/employees");
      
    } else {
  console.log("ERROR DATA:", data);
  alert(JSON.stringify(data, null, 2));
}
    }
    catch (error) {
  console.error("ERROR:", error);
  alert(JSON.stringify(error));
}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Edit Employee
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label>
                Employee ID
              </label>

              <input
                type="text"
                value={employee.employee_id}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    employee_id:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              />
            </div>

            <div>
              <label>
                Full Name
              </label>

              <input
                type="text"
                value={employee.full_name}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    full_name:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                value={employee.email}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    email:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              />
            </div>

            <div>
              <label>Phone</label>

              <input
                type="text"
                value={employee.phone}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    phone:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              />
            </div>

            <div>
              <label>
                Department
              </label>

              <input
                type="text"
                value={employee.department}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    department:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              />
            </div>

            <div>
              <label>
                Gender
              </label>

              <select
                value={employee.gender}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    gender:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              >
                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            <div>
              <label>
                Salary
              </label>

              <input
                type="number"
                value={employee.salary}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    salary:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              />
            </div>

            <div>
              <label>
                Joining Date
              </label>

              <input
                type="date"
                value={
                  employee.joining_date
                }
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    joining_date:
                      e.target.value,
                  })
                }
                className="w-full mt-2 p-3 rounded-xl bg-black/30"
              />
            </div>

            <div className="md:col-span-2">
              <label>
                Upload New Photo
              </label>

              <input
                type="file"
                onChange={(e) =>
                  setPhoto(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="w-full mt-2"
              />
            </div>

          </div>

          <button
            type="submit"
            className="mt-8 bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Update Employee
          </button>

        </form>
      </div>
    </div>
  );
}
