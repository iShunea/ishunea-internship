import { PropTypes } from "prop-types";
import "../styles/Gallery.css"
import { LazyLoadImage } from 'react-lazy-load-image-component'

import 'react-lazy-load-image-component/src/effects/blur.css';
function Gallery({paddingTop = null, paddingLeft = null, paddingRight = null, paddingBottom = null, height = null, photos}) {
    const galleryStyle = {
        paddingLeft: paddingLeft ? paddingLeft : "",
        paddingRight: paddingRight ? paddingRight : "",
        paddingTop: paddingTop ? paddingTop : "",
        paddingBottom: paddingBottom ? paddingBottom : "",
        minHeight: height ? "986px" : "", 
    }
  return (
    <section className='gallery d-flex justify-content-center' style={galleryStyle}>
        <div className='gallery-grid height-100 position-relative'>
            {photos.map((photo, index) => {
                return (
                    <div key={index} 
                        className='gallery-item position-absolute d-flex align-items-end' id={`gallery-item-${index+1}`}
                        style={{
                            top: height && index + 1 === 3 ? "-266px" : "",
                            height: height && index + 1 === 3 ? "704px" : "",
                        }}
                    >
                        <LazyLoadImage effect='opacity' src={photo.imageSrc} alt='gallery-image' threshold={200}/>
                        {photo.description ? 
                        <p className='font-inter font-weight-400 text-white m-0'>
                            {photo.description}
                        </p>
                        : undefined}
                    </div>
                )
            })}
        </div>
        
    </section>
  )
}

Gallery.propTypes = {
    paddingTop: PropTypes.string,
    paddingLeft: PropTypes.string,
    paddingRight: PropTypes.string,
    paddingBottom: PropTypes.string,
    height: PropTypes.string,
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            imageSrc: PropTypes.string.isRequired,
            description: PropTypes.string
        })
    )
}

export default Gallery