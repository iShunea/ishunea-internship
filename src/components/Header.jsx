import "../styles/Header.css"
import { PropTypes } from "prop-types";
import IconIshunea from './IconIshunea.jsx'
import MenuNav from './MenuNav.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import { NavLink, useLocation } from 'react-router-dom';
import { useModalBoxesContext } from './useModalBoxesContext.jsx';
import { useTranslation } from '../contexts/TranslationContext.jsx';

function Header({textColor = "white"}) {
  const {handleClickMobNavbar} = useModalBoxesContext();
  const { t } = useTranslation();
  
  return (
    <>
      <header className='z-3'>
        <NavLink to="/">
          <IconIshunea color={textColor === "white" ? "#FBDF06" : "#000000"}/>
        </NavLink>
        <div id='header-menu'>
          <MenuNav textColor={textColor} title={t('nav.company', 'company')} 
            itemsDroplist={[
              {
                name: t('nav.about', 'about'),
                link: "/about"
              },
              {
                name: t('nav.careers', 'careers'),
                link: "/careers"
              },
              {
                name: t('nav.blog', 'blog'),
                link: "/blogs",
              },
            ]}
            itemsHiddenDropList={[
              "/blogs/:articleId",
              "/careers/:jobId"
            ]}
            />
          <ul className='navigation-list'>
            <li>
              <CustomNavLink textColor={textColor} name="services" translationKey="nav.services"/>
            </li>
            <li>
              <CustomNavLink textColor={textColor} name="works" translationKey="nav.works"/>
            </li>
            <li>
              <CustomNavLink textColor={textColor} name="contacts" translationKey="nav.contacts"/>
            </li>
            <LanguageSwitcher textColor={textColor} />

            <button role='button' type='button' onClick={handleClickMobNavbar} className={`mobile-tablet-nav-button ${textColor === "white" ? "text-white white-mobile-tablet-nav-button" : "text-dark black-mobile-tablet-nav-button"}`}>
              <svg className={`${textColor !== "white" ? "invert-color-svg" : ""}`} width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9H13M1 1H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg> {t('nav.menu', 'menu')}
            </button>
          </ul>
        </div>
        <hr className={textColor !== "white" ? "black": undefined}></hr>
      </header>
    </>
  )
}

export default Header

Header.propTypes = {
  textColor: PropTypes.string.isRequired,
}


export const CustomNavLink = ({ textColor = "white", name = "", translationKey = "", clickHandle = () => {}}) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Function to check if the current path matches `/services` or `/services/:serviceId`
  const basePath = "/" + name;

  const isActive = () => {
    const dynamicPathPattern = new RegExp(`^${basePath}/[^/]+$`); // Regex to match `/services/:serviceId`
    
    return location.pathname === basePath || dynamicPathPattern.test(location.pathname);
  };

  return (
    <NavLink 
      to={basePath}
      onClick={clickHandle ? clickHandle : undefined}
    className={`${isActive() ? "nav-link-active" : textColor !== "white" ? "black" : undefined} mobile-nav-links`}
    >
      {translationKey ? t(translationKey, name) : name}
    </NavLink>
  );
};

CustomNavLink.propTypes = {
  textColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  translationKey: PropTypes.string,
  clickHandle: PropTypes.func,
}