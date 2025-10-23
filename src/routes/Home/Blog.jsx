import "./Blog.css"
import Row from '../../components/Row'
import { useBlog } from '../../contexts/BlogContext'
import { useTranslation } from '../../contexts/TranslationContext';

import impactCustumersImage from "/images/impact-custumers.png"
import blackFridayImage from "/images/black-friday.png"
import computerRoleImage from "/images/role-computer.png"
import partnershipImage from "/images/new-partnership.png"

function Blog() {
  const { blogs, loading } = useBlog()
  const { t } = useTranslation();
  
  const fallbackItems = [
    {
      title : "The Impact We Have on Our Customers and Our Community",
      date : "November 27, 2022",
      label : "insight",
      imageSrc : impactCustumersImage,
      link: "/blogs/impact-customers"
    },
    {
      title : "Don't Forget to Catch Black Friday Free Consultation",
      date : "November 24, 2022",
      label : "discount",
      imageSrc : blackFridayImage,
      link: "/blogs/black-friday"
    },
    {
      title : "What is The Role of Computer in Information Technology?",
      date : "November 03, 2022",
      label : "insight",
      imageSrc : computerRoleImage,
      link: "/blogs/computer-role"
    },
    {
      title : "New Partnership with Nicolae Testemițanu State University of Medicine and Pharmacy",
      date : "October 07, 2022",
      label : "partnership",
      imageSrc : partnershipImage,
      link: "/blogs/nicolae-testemiteanu"
    },
  ]
  
  const items = loading || blogs.length === 0 ? fallbackItems : blogs.slice(0, 4)
  
  return (
    <section className='blog'>
        <h3 className='font-title m-0'>{t('home.blog.title', 'Latest articles')}</h3>
        <div className='wrapper-blog'>
          <Row  items={items} nameOfItem={"news-cards"}/>
        </div>
    </section>
  )
}

export default Blog