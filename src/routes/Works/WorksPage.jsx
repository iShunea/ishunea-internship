import { useState, useMemo } from 'react'
import Projects from '../../components/Projects'
import CallToAction from '../../components/CallToAction'
import SEOHead from '../../components/SEOHead.jsx'
import { useWorks } from '../../contexts/WorksContext.jsx'
import './WorksPage.css'
import TagsBar from '../../components/TagsBar'

function WorksPage() {
  const { works, loading, error } = useWorks()
  
  const tags = useMemo(() => [
    "all",
    "software development",
    "mobile applications",
    "graphic design",
    "maintenance",
    "seo",
    "video security",
    "enterprise systems"
  ], []);

    // State to hold the filter function
    const [filterFunction, setFilterFunction] = useState(() => () => true);

    const handleButtonChange = (buttonSelected) => {
      // Update the filter function to filter projects based on the selected tag
      setFilterFunction(() => {
        return (project) => {
          if (buttonSelected === "all") {
            return true;
          }
          return project.tags && project.tags.includes(buttonSelected);
        };
      });
    };

  // Memoize the caseStudies section
  const caseStudies = useMemo(() => {
    return (
      <section id='case-studies-wrapper'>
        <div id='case-studies'>
          <h3 className='font-title m-0 width-100'>Case studies</h3>
            <TagsBar tags={tags} onTagChange={handleButtonChange} />
        </div>
      </section>
    );
  }, [tags]); // Recalculate caseStudies only when the tags array changes

  // Memoize CallToAction components
  const memoizedCallToAction = useMemo(() => <CallToAction />, []);

  const worksItems = useMemo(() => {
    return works.map(work => ({
      text: work.title || work.text,
      link: work.id,
      imageSrc: work.imageSrc || work.image || work.titleImagePath,
      tags: work.tags || []
    }));
  }, [works]);

  if (loading) {
    return (
      <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Loading works...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ paddingTop: '168px', backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Error loading works: {error}</p>
      </main>
    );
  }

  return (
    <>
      <SEOHead 
        pageData={{ 
          page_type: 'home',
          h1: 'Our Works & Case Studies'
        }}
        customMeta={{
          title: 'Our Works & Case Studies | iShunea Tech Solutions',
          description: 'Explore our portfolio of successful software development projects, mobile applications, and digital solutions.'
        }}
        breadcrumbs={[
          { name: 'Home', url: `${window.location.origin}/` },
          { name: 'Works', url: `${window.location.origin}/works` }
        ]}
      />
      <main
        className='non-default-page-main'
        style={{ 
          paddingTop: '168px', 
          backgroundColor: 'white' 
        }}
      >
        {caseStudies}
        <Projects
          backgroundColor='white'
          paddingTopBottom='0px'
          filterFunction={filterFunction}
          items={worksItems}
        />
        {memoizedCallToAction}
      </main>
    </>
  );
}

export default WorksPage;
