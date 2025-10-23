import React from 'react'
import "../styles/ModalBox.css"
import { PropTypes } from "prop-types";

function ModalBox({imageSrc = "", title = "", mainText = "", buttonComponents = [], width = "436px"}) {
  return (
    <div className='modal-box' style={{width: width}}>
        <img src={imageSrc} alt='modal-box-image'/>
        <div className='modal-box-heading'>
            <h4 className='modal-box-title m-0'>
                {title}
            </h4>

            <p className='modal-box-text m-0'>
                {mainText}
            </p>
        </div>

        <div className='modal-box-action'>
        {buttonComponents?.map((button, index) => (
            <React.Fragment key={index}>
                {button}
            </React.Fragment>
        ))}

        </div>
    </div>
  )
}

ModalBox.propTypes = {
    imageSrc: PropTypes.string, 
    title: PropTypes.string, 
    mainText: PropTypes.string,
    buttonComponents: PropTypes.arrayOf(PropTypes.node),
    width: PropTypes.string,
}

export default ModalBox