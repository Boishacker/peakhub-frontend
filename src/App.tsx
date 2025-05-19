import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import TestPage from './pages/TestPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import MyLearning from './pages/MyLearning';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import InstructorPage from './pages/Instructor';
import PublicProfile from './pages/Instructor/PublicProfile';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminInstructors from './pages/Admin/AdminInstructors';
import AdminCourses from './pages/Admin/AdminCourses';
import AdminTransactions from './pages/Admin/AdminTransactions';
import AdminReviews from './pages/Admin/AdminReviews';
import AdminReports from './pages/Admin/AdminReports';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminPages from './pages/Admin/AdminPages';
import AdminNotifications from './pages/Admin/AdminNotifications';
import AdminSettings from './pages/Admin/AdminSettings';
import './App.css';

console.log('App.tsx is loading...');

function App() {
  console.log('App component is rendering...');
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:category" element={<CourseList />} />
          <Route path="/courses/category/:categoryId" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/course-player/:courseId" element={<CoursePlayer />} />
          <Route path="/instructor" element={<InstructorPage />} />
          <Route path="/instructor/profile" element={<PublicProfile />} />
          <Route path="/instructor/profile/:instructorId" element={<PublicProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/instructors" element={<AdminInstructors />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/pages" element={<AdminPages />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
