import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useServices } from '../../contexts/ServicesContext.jsx'

import "./ServicePage.css"

import mobileAppsImage from "/images/mobile-apps.png"
import uxUiDesignImage from "/images/ux-ui-design.png"
import maintenanceImage from "/images/maintenance.png"
import graphicDesignImage from "/images/graphic-design.png"
import softwareDevelopmentImage from "/images/software-development.png"
import seoImage from "/images/seo.png"
import videoSecurityImage from "/images/video-security.png"
import enterpriseSystemsImage from "/images/enterprise-systems.png"
import CallToAction from '../../components/CallToAction'
import Progress from '../Home/Progress'
import Services from '../../components/Services'
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ServicePage() {
    const { serviceId } = useParams()
    const { getServiceById } = useServices()
    const [serviceDetails, setServiceDetails] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchService = async () => {
            const service = await getServiceById(serviceId)
            setServiceDetails(service)
            setLoading(false)
        }
        fetchService()
    }, [serviceId, getServiceById])

    if (loading) {
        return (
            <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading service...</p>
            </main>
        )
    }

    if(!serviceDetails)
    {
        return <Navigate to="404" replace={true}/>
    }

    const servicesItems = [
        {
            text: "Mobile Applications",
            link: "mobile_application_1",
            imageSrc: mobileAppsImage,
        },
        {
            text: "UX/UI Design",
            link: "",
            imageSrc: uxUiDesignImage,
        },
        {
            text: "Graphic Design",
            link: "",
            imageSrc: graphicDesignImage,
        },
        {
            text: "Maintenance",
            link: "",
            imageSrc: maintenanceImage,
        },
        {
            text: "Software Development",
            link: "",
            imageSrc: softwareDevelopmentImage,
        },
        {
            text: "SEO",
            link: "",
            imageSrc: seoImage,
        },
        {
            text: "Video Security",
            link: "",
            imageSrc: videoSecurityImage,
        },
        {
            text: "Enterprise Systems",
            link: "",
            imageSrc: enterpriseSystemsImage,
        },

    ];

  return (
    <main style={{backgroundColor:'white', paddingTop:'168px'}} className='non-default-page-main'>
        <section className='service-heading d-flex'>
            <div className='d-flex flex-column gap-8'>
                <h1 className='font-title m-0'>{serviceDetails.title}</h1>
                <p className='font-inter m-0 font-weight-400 font-size-20 line-height-30 opacity-50'>{serviceDetails.titleDescription}</p>
            </div>

            <div className='d-flex gap-24'>
                <div className='d-flex flex-column gap-4'>
                    <img className='icon-image' src={`${serviceDetails.firstIconPath}`}/>
                    <div className='d-flex flex-column'>
                        <h3 className='m-0 font-inter font-weight-500 line-height-30 font-size-20 text-dark'>
                        {serviceDetails.firstIconTitle} 
                        </h3>
                        <p className='font-weight-400 m-0 font-size-16 line-height-24 opacity-50'>
                            {serviceDetails.firstIconDescription}
                        </p>
                    </div>
                </div>

                <div className='d-flex flex-column gap-4'>
                    <img className='icon-image' src={`${serviceDetails.secondIconPath}`}/>
                    <div className='d-flex flex-column'>
                        <h3 className='m-0 font-inter font-weight-500 line-height-30 font-size-20 text-dark'>
                        {serviceDetails.secondIconTitle} 
                        </h3>
                        <p className='font-weight-400 m-0 font-size-16 line-height-24 opacity-50'>
                            {serviceDetails.secondIconDescription}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className='position-relative width-100'>
            <div className='position-absolute z-1 service-image-text-wrapper'>
                <h4 className='m-0 text-white service-image-title'>{serviceDetails.imageTitle}</h4>
                <p className='m-0 blueish-color line-height-24 font-size-16'>{serviceDetails.imageTitleDescription}</p>
            </div>
            <LazyLoadImage className='image-service-page' wrapperClassName='width-100 image-service-page overflow-hidden' effect='blur' src={serviceDetails.imageTitlePath}/>
        </section>
        <Progress/>
        <CallToAction/>
        <Services paddingBottom='100px' isPaddingTop={false} title='Other services' rowItems={servicesItems.filter((service) => service.text !== serviceDetails.title)}/>
    </main>
  )
}

export default ServicePage
