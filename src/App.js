import EditBlog from './pages/EditBlog';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/edit/:id" element={<EditBlog/>} />
                             

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
