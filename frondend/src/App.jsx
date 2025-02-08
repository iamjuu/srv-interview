import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Routes and Route are enough, no need for <Router> here
import Navbar from './components/Navbar/Navbar'
import AddForm from './pages/admin/AddForm';
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/home'
import Settings from './pages/settings'
import NotFound from './pages/NotFound/NotFound'
import Protected from './pages/Protected/protectedRouter'
import Notification from './pages/notification/notification'
import AdminHome from './pages/admin/adminHome'
const App = () => {
  return (
    <div className="font-DMSans">
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/addform" element={<AddForm />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Home />} />
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/notification" element={<Notification />} />

      </Routes>
    </div>
  );
};

export default App;
