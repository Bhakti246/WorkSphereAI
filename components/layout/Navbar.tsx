"use client";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.href = "/login";
  };

  return (
    <div className="h-20 border-b border-white/10 flex items-center justify-between px-10">

      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-gray-400">
          Admin
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}