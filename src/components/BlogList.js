import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';

const mockBlogs = [
  {
    id: 1,
    title: 'First Blog',
    content: 'This is the first blog content.',
    author: 'Alice',
    category: 'Tech',
    date: '2024-01-10'
  },
  {
    id: 2,
    title: 'React Basics',
    content: 'Understanding React components.',
    author: 'Bob',
    category: 'Programming',
    date: '2024-02-15'
  },
  {
    id: 3,
    title: 'Life Lessons',
    content: 'Some valuable life experiences.',
    author: 'Charlie',
    category: 'Personal',
    date: '2024-03-10'
  },
  // Add more mock blogs as needed
];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 2;

  useEffect(() => {
    setBlogs(mockBlogs);
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Blog List</h2>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Programming">Programming</option>
            <option value="Personal">Personal</option>
            {/* Add more categories as needed */}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {currentBlogs.map((blog) => (
          <Col md={6} key={blog.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {blog.author} | {blog.category} | {blog.date}
                </Card.Subtitle>
                <Card.Text>{blog.content.slice(0, 100)}...</Card.Text>
                <Button
  variant="primary"
  onClick={() => {
    localStorage.setItem('selectedBlog', JSON.stringify(blog));
    window.location.href = `/blog/${blog.id}`;
  }}
>
  Read More
</Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={index + 1 === currentPage ? 'dark' : 'outline-dark'}
            className="mx-1"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
