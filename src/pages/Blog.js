import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const foundBlog = blogs.find((b) => String(b.id) === id);
    setBlog(foundBlog);
  }, [id]);

  if (!blog) {
    return (
      <div className="container mt-5">
        <p className="text-danger">Blog not found or not loaded properly.</p>
        <Link to="/" className="btn btn-primary mt-3">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>{blog.title}</h2>

      {blog.image && (
        <img
          src={blog.image}
          alt="Blog"
          className="img-fluid mb-3 rounded"
          style={{ maxHeight: '400px', width: '100%', objectFit: 'cover', border: '1px solid #ccc' }}
        />
      )}

      <p className="text-muted">{blog.author} | {blog.category} | {blog.date}</p>
      <hr />
      <p>{blog.content}</p>

      <Link to="/" className="btn btn-secondary mt-3">← Back to Home</Link>
    </div>
  );
};

export default Blog;
