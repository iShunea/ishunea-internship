import { useCallback, useState } from 'react'
import ListBlogs from './ListBlogs'
import SEOHead from '../../components/SEOHead.jsx'
import { useBlog } from '../../contexts/BlogContext.jsx'

import NeverMissOportunity from '../../components/NeverMissOportunity'
import HeadingBlog from './HeadingBlog'

function BlogPage() {
  const { blogs, loading, error } = useBlog();

  const oldToNewSort = (a, b) => {
    const dateA = parseDateString(a.date);
    const dateB = parseDateString(b.date);
    return dateA - dateB;
  };
  const newToOldSort = (a, b) => {
    const dateA = parseDateString(a.date);
    const dateB = parseDateString(b.date);
    return dateB - dateA;
  };


  const [filterTagFunction, setFilterTagFunction] = useState(() => () => true);
  const [sortListFunction, setSortList] = useState(() => newToOldSort);
  

  const handleTagChange = useCallback((tag) => {
    setFilterTagFunction(() => {
        if (tag === "all articles") return () => true;
        return (article) => article.label && article.label.includes(tag);
    });
  }, []);


  const handleSortChange = useCallback((sort) => {
    if (sort === 'new to old') {
      setSortList(() => newToOldSort);
    } else {
      setSortList(() => oldToNewSort);
    }
  }, []);

  if (loading) {
    return (
      <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading blogs...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Error loading blogs: {error}</p>
      </main>
    );
  }

  return (
    <>
      <SEOHead 
        pageData={{ 
          page_type: 'home',
          h1: 'Blog & Insights'
        }}
        customMeta={{
          title: 'Blog & Insights | iShunea Tech Solutions',
          description: 'Read our latest articles and insights about software development, technology trends, and digital transformation.'
        }}
        breadcrumbs={[
          { name: 'Home', url: `${window.location.origin}/` },
          { name: 'Blog', url: `${window.location.origin}/blogs` }
        ]}
      />
      <main 
        style={{
          paddingBottom:'100px', 
          paddingLeft:'80px', 
          paddingRight:'80px', 
          paddingTop:'168px',
          backgroundColor:'white',
          gap:"64px"
        }}
        className='non-default-page-main'
        id='main-blog-page'
      >
        <HeadingBlog 
          onTagChange={handleTagChange} 
          onSortChange={handleSortChange}
        />
        <ListBlogs
          blogs={blogs} 
          sortFunction={sortListFunction}
          filterTagFunction={filterTagFunction}
        />
      </main>
      <NeverMissOportunity/>
    </>
  )
}

export default BlogPage

function parseDateString(dateString) {
  const months = ["January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"];
  
                   if (typeof dateString !== 'string' || !dateString.trim()) {
                     throw new Error('Invalid input: Input must be a non-empty string.');
                    }
                    
                    // Split the input string on commas
  const [monthDay, year] = dateString.split(',').map(part => part.trim());

  if (!monthDay || !year) {
    throw new Error('Invalid format: Expected "Month Day, Year".');
  }

  // Split month and day
  const [monthName, day] = monthDay.split(' ').map(part => part.trim());

  if (!monthName || !day) {
    throw new Error('Invalid format: Month and Day must be present.');
  }

  // Validate month
  const monthIndex = months.indexOf(monthName);
  if (monthIndex === -1) {
    throw new Error('Invalid month: Month name is not recognized.');
  }

  // Validate day and year
  const dayNumber = parseInt(day, 10);
  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
    throw new Error('Invalid day: Day must be a number between 1 and 31.');
  }

  const yearNumber = parseInt(year, 10);
  if (isNaN(yearNumber) || yearNumber < 1900 || yearNumber > 2100) {
    throw new Error('Invalid year: Year must be a number between 1900 and 2100.');
  }

  // Create and return the Date object
  return new Date(yearNumber, monthIndex, dayNumber);
}