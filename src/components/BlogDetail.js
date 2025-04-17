import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BlogContext from "../context/BlogContext";
import UserContext from "../context/UserContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, addCommentToBlog } = useContext(BlogContext);
  const { userRole } = useContext(UserContext);

  const blog = blogs.find((b) => b.id === parseInt(id));
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (blog) {
      setComments(blog.comments || []);
    }
  }, [blog]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    addCommentToBlog(blog.id, updatedComments);
    setCommentText("");
  };

  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="container mt-4">
      <h2>{blog.title}</h2>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid mb-3"
          style={{ height: "400px", objectFit: "cover" }}
        />
      )}

      <p className="text-muted">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
      <p>{blog.content}</p>

      <hr />
      <h5>Comments</h5>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} className="border p-2 mb-2 rounded">
            <p className="mb-1">{comment.text}</p>
            <small className="text-muted">{new Date(comment.timestamp).toLocaleString()}</small>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit} className="mt-3">
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Add your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Post Comment</button>
      </form>

      <Link to="/" className="btn btn-secondary mt-4">
        ← Back to Home
      </Link>
    </div>
  );
};

export default BlogDetails;
