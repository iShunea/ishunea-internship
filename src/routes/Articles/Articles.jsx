import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import Row from '../../components/Row'
import NeverMissOportunity from '../../components/NeverMissOportunity'
import SEOHead from '../../components/SEOHead.jsx'
import { generateBlogPostingSchema } from '../../utils/seoHelpers.js'
import { useBlog } from '../../contexts/BlogContext.jsx'

import "./Articles.css"
import { LazyLoadImage } from 'react-lazy-load-image-component'

function Articles() {
  const { blogId } = useParams()
  const { getBlogById } = useBlog()
  const [blogDetails, setBlogDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await getBlogById(blogId)
      setBlogDetails(blog)
      setLoading(false)
    }
    fetchBlog()
  }, [blogId, getBlogById])

  if (loading) {
    return (
      <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading article...</p>
      </main>
    )
  }
  
  if (!blogDetails) {
    return <Navigate to="404" replace={true}/>
  }

  const blogSchema = generateBlogPostingSchema({
    title: blogDetails.articleTitle,
    description: blogDetails.articleIntro,
    image: blogDetails.titleImagePath,
    datePublished: blogDetails.publishingDate,
    dateModified: blogDetails.publishingDate
  });

  return (
    <>
      <SEOHead 
        pageData={{ 
          page_type: 'blog',
          h1: blogDetails.articleTitle,
          summary_150: blogDetails.articleIntro,
          slug: blogId
        }}
        schemas={[blogSchema]}
        breadcrumbs={[
          { name: 'Home', url: `${window.location.origin}/` },
          { name: 'Blog', url: `${window.location.origin}/blogs` },
          { name: blogDetails.articleTitle, url: `${window.location.origin}/blogs/${blogId}` }
        ]}
      />
      <main style={{backgroundColor:'white', paddingTop:'168px'}} className="main-articles-page">
      <section className='article-heading d-flex flex-column position-relative'>
        <h1 className='font-title font-weight-500 m-0'>{blogDetails.articleTitle}</h1>
        <div className='d-flex article-description-wrapper align-items-center'>
          <time dateTime={blogDetails.publishingDate} className='opacity-50 font-inter article-publishing-date'>
            {blogDetails.publishingDate}
          </time>
          <span>·</span>
          <div className="article-label d-flex justify-content-center align-items-center">
            {blogDetails.label}
          </div>
        </div>
        <Link className='back-on-history-button' to="/blogs">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 9L9.5 1M9.5 1H1.5M9.5 1V9" stroke="black" strokeWidth="2" strokeLinecap="square"/>
          </svg>
        </Link>
      </section>

      <LazyLoadImage effect='blur' src={`${blogDetails.titleImagePath}`} className='articles-images'/>

      <article className='articles-blog'>
        <p className='width-100 m-0 font-weight-400 articles-blog-intro'>
          {blogDetails.articleIntro}
        </p>

        <h2 className='m-0 articles-blog-title'>
          {blogDetails.firstSubheadingTitle}
        </h2>
        <Markdown className="articles-blog-text">
          {blogDetails.fistSubheadingFirstText}
        </Markdown>
      </article>

      {blogDetails.carouselImages && blogDetails.carouselImages.length > 0 && (
        <Row items={blogDetails.carouselImages} nameOfItem='gallery'/>
      )}

      <article className='articles-blog'>
        <Markdown className="articles-blog-text">
          {blogDetails.firstSubheadingSecondText}
        </Markdown>
      </article>
      
      <div className='articles-blog-image-wrapper'>
        <LazyLoadImage  className='border-radius-20 object-fit-cover' src={`${blogDetails.firstSubheadingImage}`}/>
        <span className='font-weight-400 line-height-24 font-size-16 opacity-50 width-100 m-0 text-center'>{blogDetails.firstSubheadingImageDescription}</span>
      </div>

      <article className='articles-blog'>
        <h2 className='m-0 articles-blog-title'>
          {blogDetails.secondSubheadingTitle}
        </h2>
        <Markdown className="articles-blog-text">
          {blogDetails.secondSubheadingFirstText}
        </Markdown>
      </article>
      <NeverMissOportunity/>
    </main>
    </>
  )
}

export default Articles

// TODO add links