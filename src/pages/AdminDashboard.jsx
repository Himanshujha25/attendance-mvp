import Sidebar from "../components/admin/Sidebar";
import TopBar from "../components/admin/TopBar";
import AdminProfile from "../components/admin/AdminProfile";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Admin";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#f3f6fc] to-[#e9effa]">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow p-4 md:p-6">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-[#002147] mb-2">
            IMS NOIDA
          </h1>
          <TopBar name={name} />
        </div>

        {/* Admin Profile or Page Content */}
        <main className="flex-grow p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <AdminProfile />
          </div>
        </main>
      </div>
    </div>
  );
}
