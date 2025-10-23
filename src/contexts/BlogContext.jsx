import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogService';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const formatDateToUI = (dateString) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const normalizeBlog = (blog) => ({
    ...blog,
    id: String(blog.id),
    link: `/blogs/${blog.id}`,
    title: blog.title || blog.articleTitle || 'Untitled',
    label: blog.label || blog.tag || 'article',
    imageSrc: blog.titleImagePath || blog.carouselImagePath1 || blog.firstSubheadingImage || blog.imageSrc || blog.image || '/images/default-blog.png',
    date: formatDateToUI(blog.date || blog.publishingDate || blog.created_at),
    tags: blog.tags || []
  });

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.fetchBlogs();
      const normalizedBlogs = data.map(normalizeBlog);
      setBlogs(normalizedBlogs);
    } catch (err) {
      console.error('Error loading blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBlogById = async (id) => {
    try {
      const blog = await blogService.fetchBlogById(id);
      return blog ? normalizeBlog(blog) : null;
    } catch (err) {
      console.error(`Error fetching blog ${id}:`, err);
      return null;
    }
  };

  const getBlogTags = async () => {
    return await blogService.fetchBlogTags();
  };

  const refreshBlogs = async () => {
    const data = await blogService.refreshBlogs();
    const normalizedBlogs = data.map(normalizeBlog);
    setBlogs(normalizedBlogs);
  };

  return (
    <BlogContext.Provider 
      value={{ 
        blogs,
        getBlogById,
        getBlogTags,
        loading, 
        error,
        refreshBlogs
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};
