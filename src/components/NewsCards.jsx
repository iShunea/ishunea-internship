import "../styles/NewsCards.css"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

function NewsCards({height = "xl", item}) {
    const classnameForSize = () => {
        switch (height.toLowerCase()) {        
        case "l":
            return "card-cover-l-size";
        case "m":
            return "card-cover-m-size";
        case "s":
            return "card-cover-s-size";
        default:
            return "card-cover-xl-size";
        }
    }

  return (
    <Link className='news-cards-wrapper' to={item.link}>
        <div className={`card-cover ${classnameForSize()}`}>
            <div className='card-cover-tag'>
                <p>
                    {item.label}
                </p>
            </div>
            <LazyLoadImage effect="blur" className='card-cover-image' src={item.imageSrc}/>
        </div>
        <div className='content-news-cards'>
            <p className='title-content-news-cards'>
                {item.title}
            </p>
            <p className='date-news-cards'>
                {item.date}
            </p>
        </div>
    </Link>
)
}

NewsCards.propTypes = {
    height: PropTypes.string, 
    item: PropTypes.shape({
        link: PropTypes.string.isRequired, 
        label: PropTypes.string.isRequired, 
        imageSrc: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
};

export default NewsCards