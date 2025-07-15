import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from '../admin/Sidebar';
import TopBar from '../admin/TopBar';

export default function Reports() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const name = JSON.parse(localStorage.getItem("user"))?.name || "Admin";

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get(
          "https://attendance-mvp-1.onrender.com/api/attendance/attendance-dates",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDates(response.data);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchDates();
  }, [token]);

  const fetchAttendanceByDate = async (date) => {
    setSelectedDate(date);
    setSelectedSubject("");
    setAttendanceData([]);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://attendance-mvp-1.onrender.com/api/attendance/attendances?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // extract subjects available for this date
      const subjects = [...new Set(response.data.map((item) => item.subject))];
      setAvailableSubjects(subjects);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjectAttendance = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);
    try {
      const response = await axios.get(
        `https://attendance-mvp-1.onrender.com/api/attendance/attendances?date=${selectedDate}&subject=${subject}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://attendance-mvp-1.onrender.com/api/admin/download-pdf?date=${selectedDate}&subject=${selectedSubject}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `attendance-${selectedDate}-${selectedSubject}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("❌ Error downloading PDF:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow p-4 md:p-6">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-[#002147] mb-2">
            IMS NOIDA
          </h1>
          <TopBar name={name} />
        </div>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-8">
            📅 Attendance Reports
          </h1>

          {/* Date selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Select a Date:</h2>
            <div className="flex flex-wrap gap-3">
              {dates.length === 0 ? (
                <p className="text-gray-600">No attendance records found.</p>
              ) : (
                dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => fetchAttendanceByDate(date)}
                    className={`px-4 py-2 text-sm rounded-md font-medium transition-all ${
                      selectedDate === date
                        ? "bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-800"
                    }`}
                  >
                    {date}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Subject selection */}
          {availableSubjects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-700 mb-2">Select Subject:</h2>
              <div className="flex flex-wrap gap-3">
                {availableSubjects.map((subj, idx) => (
                  <button
                    key={idx}
                    onClick={() => fetchSubjectAttendance(subj)}
                    className={`px-4 py-2 text-sm rounded-md font-medium transition-all ${
                      selectedSubject === subj
                        ? "bg-blue-700 text-white"
                        : "bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-800"
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Attendance Table */}
          {selectedSubject && (
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-6 overflow-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                📌 Attendance on{" "}
                <span className="text-blue-600">{selectedDate}</span> for{" "}
                <span className="text-blue-600">{selectedSubject}</span>
              </h2>

              {loading ? (
                <p className="text-gray-500">⏳ Loading attendance data...</p>
              ) : attendanceData.length === 0 ? (
                <p className="text-gray-500">No students found for this date and subject.</p>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm sm:text-base border border-gray-300">
  <thead className="bg-blue-600 text-white">
    <tr>
      <th className="p-3 border">S.No</th>
      <th className="p-3 border">Name</th>
      <th className="p-3 border">Email</th>
      <th className="p-3 border">Subject</th> {/* ✅ Add Subject column */}
    </tr>
  </thead>
  <tbody>
    {attendanceData.map((student, idx) => (
      <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
        <td className="p-3 border text-center">{idx + 1}</td>
        <td className="p-3 border">{student.name}</td>
        <td className="p-3 border">{student.email}</td>
        <td className="p-3 border">{student.subject}</td> {/* ✅ Subject shown */}
      </tr>
    ))}
  </tbody>
</table>

                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={downloadPDF}
                      className="mt-5 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                    >
                      📥 Download PDF
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
