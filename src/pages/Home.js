import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("Viewer");
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = blogs.filter(blog => blog.id !== id);
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  const handleEdit = (blog) => {
    localStorage.setItem("editBlog", JSON.stringify(blog));
    navigate(`/edit/${blog.id}`);
  };

  const handleLike = (id) => {
    const updated = blogs.map(blog =>
      blog.id === id ? { ...blog, likes: (blog.likes || 0) + 1 } : blog
    );
    setBlogs(updated);
    localStorage.setItem("blogs", JSON.stringify(updated));
  };

  const handleComment = (id) => {
    const comment = prompt("Enter your comment:");
    if (comment) alert("Comment added: " + comment);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div style={{ backgroundColor: '#f1f1f1', minHeight: '100vh', padding: '30px 0' }}>
      <div className="container">

        <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Welcome to Blog System</h2>
        <p className="text-center">Current Role: <strong>{role}</strong></p>

        <div className="text-center mb-4">
          <button onClick={() => setRole("Admin")} className="btn btn-primary m-1">Set as Admin</button>
          <button onClick={() => setRole("Editor")} className="btn btn-secondary m-1">Set as Editor</button>
          <button onClick={() => setRole("Viewer")} className="btn btn-danger m-1">Set as Viewer</button>

          {role === 'Admin' && (
            <button onClick={() => navigate('/adminpanel')} className="btn btn-dark m-3">
              Go to Admin Panel
            </button>
          )}
        </div>

        <input
          type="text"
          className="form-control my-3"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="form-select mb-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Programming">Programming</option>
          <option value="Personal">Personal</option>
        </select>

        <h4 className="mb-3">Blog Posts</h4>
        {currentBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="row">
            {currentBlogs.map((blog) => (
              <div key={blog.id} className="col-md-4 mb-4">
                <div className="p-3 rounded shadow-sm bg-white h-100">
                  {blog.image && (
                    <img src={blog.image} alt="Blog" className="img-fluid rounded mb-2" style={{ height: '180px', objectFit: 'cover', width: '100%' }} />
                  )}
                  <h4 className="mb-1">{blog.title}</h4>
                  <p className="text-muted small mb-2">{blog.author} | {blog.category} | {blog.date}</p>
                  <p>{blog.content.slice(0, 100)}...</p>
                  <div className="d-flex flex-wrap gap-2">
                    <a href={`/blog/${blog.id}`} className="btn btn-sm btn-primary">Read More</a>
                    <button onClick={() => handleLike(blog.id)} className="btn btn-sm btn-outline-success">
                      Like ({blog.likes || 0})
                    </button>
                    <button onClick={() => handleComment(blog.id)} className="btn btn-sm btn-outline-info">
                      Comment
                    </button>
                    {(role === 'Admin' || role === 'Editor') && (
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(blog)}>Edit</button>
                    )}
                    {role === 'Admin' && (
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(blog.id)}>Delete</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`btn mx-1 ${currentPage === index + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
