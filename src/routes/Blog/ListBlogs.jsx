import { useEffect, useState } from 'react'
import "./ListBlogs.css"
import PropTypes from 'prop-types';
import NewsCards from "../../components/NewsCards"

function ListBlogs({blogs, filterTagFunction, sortFunction}) {
    
    const blogsPerPage = (totalBlogs) => {
        // const numberOfBlocksPerPage = 20
        const numberOfBlocksPerPage = window.innerWidth > 1310 ? 20 : 8
        const blogsEachPage = [];
        for (let i = 0; i < totalBlogs.length; i += numberOfBlocksPerPage) {
            blogsEachPage.push(totalBlogs.slice(i, i + numberOfBlocksPerPage));
        }
        return blogsEachPage
    }

    const [blogsEachPage, setBlogsEachPage] = useState(() => blogsPerPage(blogs))
    const [currentPage, setCurrentPage] = useState(0);

    const handlePage = (e) => {
        if (e.target.id === "left-page" && blogsEachPage[currentPage - 1])
            setCurrentPage(currentPage - 1)
        else if (e.target.id === "right-page" && blogsEachPage[currentPage + 1])
            setCurrentPage(currentPage + 1)
    }

    useEffect(() => {
        let copiedBlogs = [...blogs]
        if (filterTagFunction) {
            copiedBlogs = copiedBlogs.filter(filterTagFunction)
            setBlogsEachPage(blogsPerPage(copiedBlogs))
        }
        if (sortFunction){
            copiedBlogs = copiedBlogs.toSorted(sortFunction)
            setBlogsEachPage(blogsPerPage(copiedBlogs))
        }
    }, [filterTagFunction, sortFunction, blogs])

    const column1 = []
    const column2 = []
    const column3 = []
    const column4 = []

    const sizes = ["s", "m", "l", "xl"]
    const sizesLength = sizes.length

    let column1Size = sizes[1]
    let column2Size = sizes[3]
    let column3Size = sizes[2]
    let column4Size = sizes[0]
    
    const currentPageContent = blogsEachPage[currentPage] || [];

    for (let i = 0; i < currentPageContent.length; i++) {
        const blog = currentPageContent[i]
        if (i % 4 === 0) {
            column1.push(<NewsCards item={blog} key={i} height={column1Size}/>)
            column1Size = sizes[(sizes.indexOf(column1Size) + 1) % sizesLength]
        } else if (i % 4 === 1) {
            column2.push(<NewsCards item={blog} key={i} height={column2Size}/>)
            column2Size = sizes[(sizes.indexOf(column2Size) + 1) % sizesLength]
        } else if (i % 4 === 2) {
            column3.push(<NewsCards item={blog} key={i} height={column3Size}/>)
            column3Size = sizes[(sizes.indexOf(column3Size) + 1) % sizesLength]
        } else {
            column4.push(<NewsCards item={blog} key={i} height={column4Size}/>)
            column4Size = sizes[(sizes.indexOf(column4Size) + 1) % sizesLength]
        }
    }


  return (
    <section className='width-100'>
        <div className='d-flex width-100 justify-content-center flex-wrap' id='list-blogs'>
            <div className='d-flex flex-column row-blogs'>
                {column1.map((card) => (card))}
            </div>
            
            <div className='d-flex flex-column row-blogs'>
                {column2.map((card) => (card))}
            </div>

            <div className='d-flex flex-column row-blogs'>
                {column3.map((card) => (card))}
            </div>

            <div className='d-flex flex-column row-blogs'>
                {column4.map((card) => (card))}
            </div>
        </div>
        
        <div className='width-100 d-flex justify-content-center'>
            <div className="pagination">
                <div id="left-page" className={`${blogsEachPage[currentPage - 1] ? "" : "button-deactivated"}`} onClick={(e) => handlePage(e)}>❮</div>
                <div id='right-page' className={`${blogsEachPage[currentPage + 1] ? "" : "button-deactivated"}`} onClick={(e) => handlePage(e)}>❯</div>
            </div>
        </div>
    </section>
  )
}

ListBlogs.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,      // Blog title must be a string
      label: PropTypes.string.isRequired,      // Label must be a string
      imageSrc: PropTypes.string.isRequired,   // Image source must be a string (URL path)
      date: PropTypes.string.isRequired,       // Date must be a string
    })
  ).isRequired, // The `blogs` array itself is required
  filterTagFunction: PropTypes.func,
  sortFunction: PropTypes.func,
};
export default ListBlogs