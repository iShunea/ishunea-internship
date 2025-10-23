import "./CareersImage.css"

import icon1 from "/images/icon-careers-image1.svg"
import icon2 from "/images/icon-careers-image2.svg"
import icon3 from "/images/icon-careers-image3.svg"
import icon4 from "/images/icon-careers-image4.svg"
import icon5 from "/images/icon-careers-image5.svg"
import icon6 from "/images/icon-careers-image6.svg"


import backgroundImage from "/images/background-image-blue-clouds.jpg"

function CareersImage() {
    const gridElements = [
        {
            imageSrc: icon1,
            title: "top of the market salaries",
        },
        {
            imageSrc: icon2,
            title: "health & wellness insurance",
        },
        {
            imageSrc: icon3,
            title: "flexwork just as you need it",
        },
        {
            imageSrc: icon4,
            title: "opportunities for students",
        },
        {
            imageSrc: icon5,
            title: "yearly learning stipend",
        },
        {
            imageSrc: icon6,
            title: "company recharge & team building days",
        },
        
    ]
  return (
    <section className='width-100 d-flex justify-content-center position-relative' id='careers-image'>
        <img className='background-image' src={backgroundImage} alt="background-image"></img>
        <div className='width-100 height-100 position-relative' id='careers-image-1440px'>
            <h2 className='font-title font-weight-500 text-white position-absolute m-0' id='careers-image-title'>Why join 
            iShunea</h2>

            <div className="d-flex flex-column position-absolute" id="grid-careers-image">
                <div className="width-100 d-flex">
                    {gridElements.slice(0, 3).map((element, index) => (
                        <div className="d-flex flex-column careers-element-wrapper" key={`second-${index}`}>
                            <img
                                className="icon-image"
                                src={element.imageSrc}
                                alt="careers-image"
                                />
                            <h4 className="text-white font-size-16 m-0">{element.title}</h4>
                        </div>
                    ))}
                </div>

                <div className="width-100 d-flex">
                    {gridElements.slice(3).map((element, index) => (
                        <div className="d-flex flex-column careers-element-wrapper" key={`second-${index}`}>    
                            <img
                                className="icon-image"
                                src={element.imageSrc}
                                alt="careers-image"
                            />
                            <h4 className="text-white font-size-16 m-0">{element.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
    
  )
}

export default CareersImage