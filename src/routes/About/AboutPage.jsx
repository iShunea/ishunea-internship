import Advantage from '../../components/Advantage'
import Clients from '../../components/Clients'
import Team from './Team'
import AboutImage from './AboutImage'
import Careers from './Careers'
import SEOHead from '../../components/SEOHead.jsx'
import { getOrganizationSchema } from '../../utils/seoHelpers.js'

import ishunea1 from "/images/ishunea1.png"
import ishunea2 from "/images/ishunea2.png"
import ishunea3 from "/images/ishunea3.png"
import ishunea4 from "/images/ishunea4.png"
import ishunea5 from "/images/ishunea5.png"
import ishunea6 from "/images/ishunea6.png"
import Gallery from '../../components/Gallery'
import HeadOfPage from '../../components/HeadOfPage'

function AboutPage() {
  const photos = [
    {
      imageSrc: ishunea1,
    },
    {
      imageSrc: ishunea2,
    },
    {
      imageSrc: ishunea3,
      description: "Founded in 2019 in Moldova, after 20+ clients, we started expanding and now our teams deliver value through their work in Romania and Israel."
    },
    {
      imageSrc: ishunea4,
    },
    {
      imageSrc: ishunea5,
    },
    {
      imageSrc: ishunea6,
    },
  ];

  return (
    <>
      <SEOHead 
        pageData={{ 
          page_type: 'home',
          h1: 'What is iShunea'
        }}
        customMeta={{
          title: 'What is iShunea | iShunea Tech Solutions',
          description: 'We are moving your ideas to digital by building the ultimate solutions for ERP systems, CRMs, mobile apps and web platforms'
        }}
        schemas={[getOrganizationSchema()]}
        breadcrumbs={[
          { name: 'Home', url: `${window.location.origin}/` },
          { name: 'About', url: `${window.location.origin}/about` }
        ]}
      />
      <main style={{paddingTop: "168px", backgroundColor:"white"}} className="non-default-page-main">
          <HeadOfPage title="What is iShunea" description="We are moving your ideas to digital by building the ultimate solutions for ERP systems, CRMs, mobile apps and web platforms"/>
          <Gallery photos={photos}/>
          <Clients textColor='non-default' paddingLeftRight="80px" paddingTop="40px" paddingBottom="64px"/>
          <Advantage paddingBottom="0px"/>
          <Team/>
          <AboutImage/>
          <Careers/>
      </main>
    </>
)
}

export default AboutPage