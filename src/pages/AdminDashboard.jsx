import Sidebar from "../components/admin/Sidebar";
import TopBar from "../components/admin/TopBar";
import AdminProfile from "../components/admin/AdminProfile"

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "Admin";

  return (
    
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />
      
      <div className="flex-1 p-6">
      <h1 className="text-3xl font-sans text-blue-700 text-center mb-2">IMS NOIDA</h1>
        <TopBar name={name} />
        <AdminProfile/>
      </div>
    </div>
  );
}
