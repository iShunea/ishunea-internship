import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useWorks } from '../../contexts/WorksContext.jsx'
import "./WorkPage.css"

import { LazyLoadImage } from 'react-lazy-load-image-component'
import Button from '../../components/Button'

function WorkPage() {
    const { workId } = useParams()
    const { getWorkById } = useWorks()
    const [workDetails, setWorkDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWork = async () => {
            const work = await getWorkById(workId)
            setWorkDetails(work)
            setLoading(false)
        }
        fetchWork()
    }, [workId, getWorkById])

    if (loading) {
        return (
            <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading work...</p>
            </main>
        )
    }

    if(!workDetails)
    {
        return <Navigate to="404" replace={true}/>
    }

    const icons = [
        "/images/phone.svg", 
        "/images/desktop.svg", 
        "/images/laptop.svg", 
        "/images/bicycle.svg", 
        "/images/diamond.svg", 
        "/images/headphones.svg", 
        "/images/photo-camera.svg", 
        "/images/home-wifi.svg", 
        "/images/car.svg", 
        "/images/gym.svg", 
        "/images/note.svg", 
        "/images/market.svg", 
        "/images/search.svg", 
        "/images/touch.svg", 
        "/images/refresh.svg", 
        "/images/picture-icon.svg", 
        "/images/star.svg", 
        "/images/link.svg", 
        "/images/direction.svg", 
        "/images/play.svg", 
        "/images/garbage.svg", 
        "/images/whatisit.svg", 
        "/images/multiply.svg", 
        "/images/grocery.svg", 
    ]

  return (
    <>
        <main>
            <section className='position-relative width-100'>
                <div className='width-100'>
                    <div className='width-100 gradient-image-work height-100 z-1 top-0 left-0 position-absolute'/>
                    <LazyLoadImage className='width-100 work-image z-0' src={workDetails.titleImagePath}/>
                </div>
                <div className='position-absolute work-heading gap-8 d-flex flex-column z-2 text-white'>
                    <div className='d-flex flex-column gap-8 work-image-title'>
                        <h1 className='m-0 font-title'>{workDetails.title}</h1>
                        <p className='m-0 opacity-50 font-inter font-weight-400 line-height-30 font-size-20'>{workDetails.titleParagraph}</p>
                    </div>

                    <div className='d-flex gap-24 work-title-button'>
                        <Button type="button" text='visit website' visitExternalLink={workDetails.visitWebsiteLink} nonDefaultSize={true} widthDefaultButton='100%'/>
                    </div>
                </div>
            </section>

            <section className='width-100 work-call-to-action-wrapper'>
                <div className='width-100 work-call-to-action-box d-flex flex-column'>
                    <div className='d-flex flex-column gap-16 work-call-to-action-box-heading justify-content-center align-items-center text-white'>
                        <h2 className='m-0 font-title'>{workDetails.callToActionTitle}</h2>
                        <p className='m-0 font-inter opacity-50 font-weight-400 font-size-20 line-height-30 text-center'>{workDetails.callToActionParagraph}</p>
                    </div>

                    <hr className='m-0 line-break-work-to-action'/>

                    <div className='work-call-to-action-box-heading d-flex gap-40'>
                        <div className='d-flex flex-column gap-8 text-white'>
                            <img className='icon-card' src="/images/practices.svg"/>
                            <div className='d-flex flex-column'>
                                <h4 className='m-0 font-inter font-weight-500 font-size-20 line-height-30'>Best practices</h4>
                                <p className='m-0 opacity-50 font-weight-500 font-size-16 line-height-24'>The main goal was to adapt the current solutions available on the market to a fresh-looking website aligned with global brand.</p>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-8 text-white'>
                            <img className='icon-card' src="/images/process.svg"/>
                            <div className='d-flex flex-column'>
                                <h4 className='m-0 font-inter font-weight-500 font-size-20 line-height-30'>Process transparency</h4>
                                <p className='m-0 opacity-50 font-weight-500 font-size-16 line-height-24'>Any step & page is as informative and interactive as possible. No secret paths 
                                as everything is available in just one click.</p>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-8 text-white'>
                            <img className='icon-card' src="/images/practices.svg"/>
                            <div className='d-flex flex-column'>
                                <h4 className='m-0 font-inter font-weight-500 font-size-20 line-height-30'>Part of the brand</h4>
                                <p className='m-0 opacity-50 font-weight-500 font-size-16 line-height-24'>Even if visual distinction between the company&apos;s global site is acceptable, the entire site should feel like part of the Xiaomi brand.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='width-100 background-color-white work-projects d-flex flex-column align-items-center justify-content-center'>
                <div className='position-relative work-projects-wrapper height-100 overflow-hidden'>
                    <div className='d-flex flex-column gap-16 work-projects-heading'>
                        <h4 className='text-dark m-0 font-title'>Fresh-looking final solution</h4>
                        <p className='m-0 font-weight-400 font-size-16 line-height-24 opacity-50 text-dark'>Along with beautifully crafted homepage there is a catalogue section with well-structured hierarchy and functional filters</p>
                    </div>
                    
                    <div className='position-absolute width-100 work-projects-grid'>
                        <div className='first-column-work-project position-absolute d-flex flex-column gap-8'>
                            {workDetails.firstColumnProjects?.map((project, index) => (
                                <div key={index}>
                                    <h5 className='work-project-title-font'>{project.title.toUpperCase()}</h5>
                                    <LazyLoadImage className='width-100' effect='blur' src={project.imagePath}/>
                                </div>
                            ))}
                        </div>

                        <div className='second-column-work-project position-absolute d-flex flex-column gap-8'>
                            {workDetails.secondColumnProjects?.map((project, index) => (
                                <div key={index}>
                                    <h5 className='work-project-title-font'>{project.title.toUpperCase()}</h5>
                                    <LazyLoadImage className='width-100' effect='blur' src={project.imagePath}/>
                                </div>
                            ))}
                        </div>

                        <div className='third-column-work-project position-absolute d-flex flex-column gap-8'>
                            {workDetails.thirdColumnProjects?.map((project, index) => (
                                <div key={index}>
                                    <h5 className='work-project-title-font'>{project.title.toUpperCase()}</h5>
                                    <LazyLoadImage className='width-100' effect='blur' src={project.imagePath}/>
                                </div>
                            ))}
                        </div>

                        <div className='fourth-column-work-project position-absolute d-flex flex-column gap-8'>
                            {workDetails.fourthColumnProjects?.map((project, index) => (
                                <div key={index}>
                                    <h5 className='work-project-title-font'>{project.title.toUpperCase()}</h5>
                                    <LazyLoadImage className='width-100' effect='blur' src={project.imagePath}/>
                                </div>
                            ))}
                        </div>

                        <div className="container-work-hidden position-absolute width-100 z-1" />
                    </div>
                </div>
            </section>
        </main>
        
        <section className='width-100 work-call-to-action d-flex flex-column gap-4 background-color-white'>
            <div className='d-flex flex-column work-screens-container justify-content-center align-items-center'>
                <h4 className='m-0 z-3 font-title screens-width text-center'><span className='yellow-span'>20+</span> screens and<br/><span className='yellow-span'>30+</span> <span className='customized-none'>customised</span> icons</h4>
                <div className='d-flex width-100 flex-column gap-40 justify-content-center align-items-center px-3'>
                    <div className='d-flex width-100 gap-40 flex-wrap align-items-center icons-work-page'>
                        {icons.map((icon, index) => (
                            <img src={icon} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section className='width-100 review-work-section'>
            <div className='d-flex justify-content-center align-items-center review-work-wrapper'>
                <div className='d-flex flex-column justify-content-center width-100 align-items-center gap-40 review-work'>
                    <blockquote className='m-0 font-title-400 line-height-24 quota-review-work'>
                        {workDetails.review?.text}
                    </blockquote>

                    <div className='d-flex gap-24 width-100'>
                        <img src={workDetails.review?.imageSrc} className='rounded-circle review-author-image' alt={workDetails.review?.author}/>

                        <div className='d-flex flex-column gap-4'>
                            <p className='m-0 font-inter font-weight-500 font-size-20 line-height-30 tex-dark'>{workDetails.review?.author}</p>
                            <p className='m-0 font-weight-400 font-size-16 line-height-24 text-dark opacity-50'>{workDetails.review?.position}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default WorkPage