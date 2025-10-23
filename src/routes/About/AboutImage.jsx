import "./AboutImage.css"

function AboutImage() {
  return (
    <section className='about-image'>
        <div className='about-row d-flex'>
            <div className='about-item d-flex flex-column'>
                <p className='about-paragraph text-white m-0'>2019</p>
                <p className='about-description text-white m-0'>established</p>
            </div>
            <div className='about-item d-flex flex-column'>
                <p className='about-paragraph text-white m-0'>15+</p>
                <p className='about-description text-white m-0'>outstanding professionals</p>
            </div>
            <div className='about-item d-flex flex-column'>
                <p className='about-paragraph text-white m-0'>7.5y</p>
                <p className='about-description text-white m-0'>average team experience</p>
            </div>
            <div className='about-item d-flex flex-column'>
                <p className='about-paragraph text-white m-0'>20+</p>
                <p className='about-description text-white m-0'>happy partners</p>
            </div>
        </div>
    </section>
  )
}

export default AboutImage