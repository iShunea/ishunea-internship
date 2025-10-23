import "../styles/CallToAction.css"
import Button from "./Button"
import { useModalBoxesContext } from './useModalBoxesContext'
import { useTranslation } from '../contexts/TranslationContext';

function CallToAction() {
  const { handleClickCall } = useModalBoxesContext()
  const { t } = useTranslation();

  return (
  <section className='call-to-action'>
    <div className='box-call-to-action'>
      <div className='heading-call-to-action'>
        <h3 className='font-title m-0'>{t('home.cta.title', 'Not sure about what you need?')}</h3>
        <p>{t('home.cta.description', 'Request a consultation so we offer our knowledge base to help you set up the best digital solution for your business')}</p>
      </div>
      <Button type="button" text={t('home.cta.button', 'request now')} color="non-default" nonDefaultSize={true} widthDefaultButton="max-content" handleClick={handleClickCall}/>
    </div>
  </section>
  )
}

export default CallToAction