import { useState, useEffect } from 'react'
import TagsBar from '../../components/TagsBar'
import "./HeadingBlog.css"
import PropTypes from 'prop-types';


const HeadingBlog = ({onTagChange, onSortChange}) => {
    const [sortButton, setSortButton] = useState("from new publications to old")
    const tags = [
        "all articles",
        "insight",
        "discount",
        "partnership"
    ]

    const isMobile = window.innerWidth <= 940 ? true : false

    useEffect(() => {
        if (onSortChange)
            onSortChange(sortButton)

    }, [sortButton, onSortChange])
  
  return (
    <>
        <div className='d-flex flex-wrap width-100 justify-content-between align-items-center' id='heading-wrapper-blog'>
            <h1 className='font-title font-weight-500 m-0' id='blog-heading-title'>Blog</h1>

            <div className='d-flex gap-16 align-items-center' id="tags-bar-wrapper-blogs-page">
                <span className='font-size-16 line-height-24 opacity-40 text-dark font-weight-500 display-none-blog-page'>
                show
                </span>
                <TagsBar tags={tags} onTagChange={onTagChange}/>
            </div>

            <div id='blogs' className='gap-16 d-flex justify-content-center align-items-center'>
                <span className='text-dark opacity-40 line-height-24 font-size-16 font-weight-500 display-none-blog-page'>sort</span>
                <div className="dropdown" id='sort-button-wrapper-blog-page'>
                    <button className="text-dark btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {isMobile ? 
                            (
                                <>
                                    <svg id='sort-mobile-icon' width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.42857 3.4V13M4.42857 13L1 9.4M4.42857 13L7.85714 9.4M13.5714 10.6V1M13.5714 1L10.1429 4.6M13.5714 1L17 4.6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {" sort"}
                                </>
                                
                            )
                            : 
                            (
                                <>
                                    {sortButton + " "}
                                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 6.5H11M11 6.5L6 11.5M11 6.5L6 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </>
                            )
                        }
                        
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a data-target="#" className="dropdown-item" onClick={() => setSortButton("new to old")}>new to old</a></li>
                        <li><a data-target="#" className="dropdown-item" onClick={() => setSortButton("old to new")}>old to new</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

HeadingBlog.propTypes = {
    onTagChange: PropTypes.func,  // Validate as a function
    onSortChange: PropTypes.func, // Validate as a function
};

export default HeadingBlog