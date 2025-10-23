const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ishunea-backend.replit.app';

class BlogService {
  constructor() {
    this.cache = new Map();
    // Cache TTL: 5 minutes for development (easier testing when data changes in Admin)
    this.CACHE_TTL = 5 * 60 * 1000;
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const cached = localStorage.getItem('blogs_cache');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        if (age < this.CACHE_TTL) {
          this.cache.set('all', {
            blogs: data,
            timestamp: timestamp
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load blogs from localStorage:', error);
    }
  }

  saveToLocalStorage(blogs) {
    try {
      localStorage.setItem('blogs_cache', JSON.stringify({
        data: blogs,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to save blogs to localStorage:', error);
    }
  }

  async fetchBlogs() {
    if (this.cache.has('all')) {
      const cacheEntry = this.cache.get('all');
      const age = Date.now() - cacheEntry.timestamp;
      
      if (age < this.CACHE_TTL) {
        return cacheEntry.blogs;
      } else {
        this.cache.delete('all');
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blogs = await response.json();
      
      this.cache.set('all', {
        blogs,
        timestamp: Date.now()
      });
      this.saveToLocalStorage(blogs);
      
      return blogs;
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      return this.getFallbackBlogs();
    }
  }

  async fetchBlogById(id) {
    try {
      const blogs = await this.fetchBlogs();
      return blogs.find(blog => String(blog.id) === String(id));
    } catch (error) {
      console.error('Failed to fetch blog by id:', error);
      return null;
    }
  }

  async fetchBlogTags() {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/tags`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch blog tags:', error);
      return [];
    }
  }

  getFallbackBlogs() {
    return [];
  }

  clearCache() {
    this.cache.clear();
    localStorage.removeItem('blogs_cache');
  }

  async refreshBlogs() {
    this.cache.delete('all');
    return this.fetchBlogs();
  }
}

export default new BlogService();
