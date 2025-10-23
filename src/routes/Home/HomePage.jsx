import Hero from './Hero.jsx';
import Advantage from '../../components/Advantage.jsx';
import Projects from '../../components/Projects.jsx';
import CallToAction from '../../components/CallToAction.jsx';
import Blog from "./Blog.jsx"
import Progress from "./Progress.jsx"
import SEOHead from '../../components/SEOHead.jsx';
import { getOrganizationSchema, getWebSiteSchema } from '../../utils/seoHelpers.js';
import { useServices } from '../../contexts/ServicesContext';
import { useWorks } from '../../contexts/WorksContext';

import mobileAppsImage from "/images/mobile-apps.png"
import uxUiDesignImage from "/images/ux-ui-design.png"
import maintenanceImage from "/images/maintenance.png"
import graphicDesignImage from "/images/graphic-design.png"
import Services from '../../components/Services.jsx';

function HomePage() {
  const { services, loading: servicesLoading } = useServices();
  const { works, loading: worksLoading } = useWorks();

  const fallbackServicesItems = [
    {
      text: "Mobile Applications",
      link: "/services/mobile_application_1",
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
  ];

  const servicesItems = servicesLoading || services.length === 0 ? fallbackServicesItems : services.slice(0, 4);
  
  // Only show Projects when we have real data from backend (no mock/fallback data)
  const hasRealProjects = !worksLoading && works.length > 0;
  const projectsItems = hasRealProjects ? works.slice(0, 12) : null;

  return (
    <>
      <SEOHead 
        pageData={{ page_type: 'home' }}
        schemas={[getOrganizationSchema(), getWebSiteSchema()]}
      />
      <main id="home-page-main">
        <Hero/>
        <Services rowItems={servicesItems}/>
        <Advantage/>
        {hasRealProjects && <Projects thereAreTitleAndClients={true} items={projectsItems}/>}
        <Progress/>
        <CallToAction/>
        <Blog/>
      </main>
    </>
  )
}

export default HomePage;