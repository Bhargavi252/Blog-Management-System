import React, { useState } from 'react';

const BlogForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [content, setContent] = useState(initialData.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && category && content) {
      onSubmit({ title, author, category, content, date: new Date().toISOString().split("T")[0] });
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <button type="submit" className="btn btn-primary mt-2">Submit</button>
    </form>
  );
};

export default BlogForm;
