import Button from "../../components/Button";
import "./Hero.css"
import Carter from "/images/Carter.svg" 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTranslation } from '../../contexts/TranslationContext';

function Hero() {
  const { t } = useTranslation();
  
  return (
  <>
    <section className='hero'>
        <div className="content"> 
            <div className='homepage-header'>
                <h1>{t('home.hero.title', 'Moving your ideas to digital')}</h1>
                <p>{t('home.hero.description', 'The ultimate solutions for ERP systems, CRMs, mobile apps and web platforms')}</p>
            </div>
            <Button 
              text={t('home.hero.button', 'contact us')}
              nonDefaultSize={true}
              type="button"
            />
        </div>
        <LazyLoadImage effect="blur" src={Carter} className='carter-image'/>
    </section>
  </>
    )
}

export default Hero