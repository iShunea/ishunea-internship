import "../styles/ServiceItem.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ServiceItem({height = "default", item}) {

    const Icon = () => (
        <svg width="8" height="8" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 9L9.5 1M9.5 1H1.5M9.5 1V9" stroke="black" strokeWidth="2" strokeLinecap="square"/>
        </svg>
    )

    const ItemFooter = () => (
        <div className='service-item-footer'>
            <div className='service-item-footer-title'>
                <p className='service-item-p'>
                {item.text}
                </p>
                <button type='button' className='button-service-item'>
                    <Icon/>
                </button>
            </div>
        </div>
    )

    if (height !== "default") {
        return (
            <Link className="service-item-minimized"  to={item.link ? item.link : "#"}>
                <LazyLoadImage effect="blur" wrapperClassName='image-service-item' src={item.imageSrc}/>
                <ItemFooter/>
            </Link>
        )
    }
    
  return (
        <Link className="service-item-default" to={item.link ? item.link : "#"}>
            <ItemFooter/>
            <LazyLoadImage effect="blur" wrapperClassName='image-service-item' src={item.imageSrc}/>
        </Link>
  )
}

ServiceItem.propTypes = {
    height: PropTypes.string,
    item: PropTypes.shape({
        text: PropTypes.string.isRequired, 
        link: PropTypes.string,
        imageSrc: PropTypes.string.isRequired,
    }).isRequired,
};

export default ServiceItem