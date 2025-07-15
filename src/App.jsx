// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Student_home from './pages/Student_home';
import Addclass from './components/admin/Addclass';
import Mangeclass from './components/admin/Mangeclass';
import GenerateCode from './components/admin/GenerateCode';
import Reports from './components/admin/Reports'
import Admin_user from './pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path='/student/dashboard' element={<Student_home/>}/>
        <Route path='/admin/dashboard' element={<Admin_user/>}/>   
          <Route path='/admin/addclass' element={<Addclass />} />
          <Route path='/admin/classes' element={<Mangeclass/>}/>
         <Route path="/admin/generate-code" element={<GenerateCode />} />
         <Route path="/admin/reports" element={<Reports/>}/>

      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
      </>
    </Router>
    
  );
}

export default App;
