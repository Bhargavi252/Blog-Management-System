import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    id: '',
    title: '',
    author: '',
    category: '',
    content: '',
    date: ''
  });

  useEffect(() => {
    const editBlog = JSON.parse(localStorage.getItem("editBlog"));
    if (editBlog && editBlog.id === id) {
      setBlog(editBlog);
    }
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlogs = storedBlogs.map((b) =>
      b.id === blog.id ? blog : b
    );
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h3>Edit Blog</h3>
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author:</label>
        <input
          type="text"
          name="author"
          value={blog.author}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category:</label>
        <input
          type="text"
          name="category"
          value={blog.category}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Content:</label>
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          className="form-control"
          rows="5"
        />
      </div>
      <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditBlog;
