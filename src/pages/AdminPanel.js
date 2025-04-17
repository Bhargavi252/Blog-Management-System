import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    id: Date.now(),
    title: '',
    author: '',
    category: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    image: '' 
  });

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlog((prevBlog) => ({
          ...prevBlog,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const updatedBlogs = [...existingBlogs, blog];
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    alert('Blog added successfully!');
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h3>Admin Panel - Add New Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Title</label>
          <input type="text" name="title" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-2">
          <label>Author</label>
          <input type="text" name="author" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-2">
          <label>Upload Image</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>
        <div className="form-group mb-2">
          <label>Category</label>
          <input type="text" name="category" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group mb-2">
          <label>Content</label>
          <textarea name="content" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Add Blog</button>
      </form>
    </div>
  );
};

export default AdminPanel;
