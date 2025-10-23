import "./News.css"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PropTypes from 'prop-types';

function News({newsItems}) {   

  return (
    <section className='width-100 d-flex flex-column justify-content-center align-items-center' id='news-career'>
        <div id='news-career-heading' className='d-flex flex-column justify-content-center align-items-center'>
            <h2 className='font-title font-weight-500 m-0 text-dark'>Life at iShunea</h2>
            <h3 id="news-subheading" className='font-weight-400 text-dark font-inter opacity-50 m-0'>Connection and kindness are core to our culture</h3>
        </div>

        <div className='d-flex width-100 justify-content-center align-items-center' id='news-career-row-wrapper'>
        {newsItems.map((element) => (
                <div className='d-flex news-career-items justify-content-start' key={element.description}>
                    <LazyLoadImage effect='blur' src={element.imageSrc} alt='News Image' className='news-career-image width-100'/>
                    <div className='d-flex flex-column news-career-text'>
                        <h3 className='news-career-items-title font-inter font-weight-500 text-dark m-0'>{element.title}</h3>
                        <p className='news-career-items-paragraph font-weight-400 opacity-50 text-dark m-0'>{element.description}</p>
                    </div>
                </div>
            ))
        }
        </div>
    </section>
  )
}

News.propTypes = {
    newsItems: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired
    }))
}

export default News