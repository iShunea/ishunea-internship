import "../styles/HeadOfPage.css"
import { PropTypes } from "prop-types";


function HeadOfPage({title, description, buttonComponents = null}) {
  return (
    <section className='d-flex flex-column width-100' id="head-of-page-about">
        <h1 className='text-dark m-0' id="title-head-of-page-about">{title}</h1>
        <p className='font-inter text-dark font-weight-400 m-0' id='parag-head-of-page-about'>{description}</p>
        {buttonComponents && 
            <div className="d-flex buttons-head-of-page-about">
                {buttonComponents.map((button, index) => {
                    return (
                        <div key={index}>
                            {button}
                        </div>
                    ); 
                })}
            </div>
        }

    </section>
  )
}

HeadOfPage.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonComponents: PropTypes.arrayOf(PropTypes.node),
}

export default HeadOfPage