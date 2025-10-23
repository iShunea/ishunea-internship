import CallToAction from '../../components/CallToAction'
import Services from "../../components/Services.jsx"
import SEOHead from '../../components/SEOHead.jsx'
import { useServices } from '../../contexts/ServicesContext.jsx'

function ServicesPage() {
    const { services, loading, error } = useServices()

    if (loading) {
        return (
            <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading services...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Error loading services: {error}</p>
            </main>
        )
    }

    const servicesItems = services.map(service => ({
        text: service.title || service.text,
        link: service.id,
        imageSrc: service.imageSrc || service.image
    }));

      return (
        <>
          <SEOHead 
            pageData={{ 
              page_type: 'home',
              h1: 'Our Services'
            }}
            customMeta={{
              title: 'Our Services | iShunea Tech Solutions',
              description: 'Comprehensive software development services including mobile applications, web development, UX/UI design, and enterprise systems.'
            }}
            breadcrumbs={[
              { name: 'Home', url: `${window.location.origin}/` },
              { name: 'Services', url: `${window.location.origin}/services` }
            ]}
          />
          <main style={{paddingTop:'168px', backgroundColor:'white'}} className='non-default-page-main'>
              <Services rowItems={servicesItems} isPaddingTop={false} paddingBottom='0'/>
              <CallToAction/>
          </main>
        </>
    )
}

export default ServicesPage