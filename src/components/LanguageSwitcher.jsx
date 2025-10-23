import { useState, useCallback, useRef } from 'react';
import { PropTypes } from "prop-types";
import { useLanguage } from '../contexts/SEOContext';
import "../styles/MenuNav.css";
import arrowImage from "/images/arrow.svg";
import sunnyArrowImage from "/images/sunny-arrow.svg";
import romanian from "/images/romanian.svg";
import russian from "/images/russian.svg";
import english from "/images/english.svg";

const LanguageSwitcher = ({ textColor = "white" }) => {
  const { currentLang, changeLanguage, availableLangs } = useLanguage();
  const [arrowSide, setArrowSide] = useState("down");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const timeoutRef = useRef(null);

  const mobileDevice = window.innerWidth < 1110;

  const languageConfig = {
    en: { flag: english, name: "English" },
    ro: { flag: romanian, name: "Română" },
    ru: { flag: russian, name: "Русский" }
  };

  const currentConfig = languageConfig[currentLang];
  const otherLangs = availableLangs.filter(lang => lang !== currentLang);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownVisible(true);
    setArrowSide("up");
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setArrowSide("down");
      setIsDropdownVisible(false);
    }, 100);
  };

  const handleToggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
    setArrowSide(isDropdownVisible ? "down" : "up");
  };

  const handleClickLanguage = (lang) => {
    changeLanguage(lang);
    setIsDropdownVisible(false);
    setArrowSide("down");
  };

  const getTextColorClass = () => {
    switch (textColor) {
      case "white":
        return "text-white";
      case "sunny":
        return "sunny";
      default:
        return "black";
    }
  };

  const getArrowClassNames = () => {
    const getArrowColor = () => {
      return textColor === "white" ? "white-color-svg" : undefined;
    };

    const baseClass = "arrow";
    const directionClass = arrowSide === "up" ? "up" : "";
    return `${baseClass} ${directionClass} ${getArrowColor()}`;
  };

  return (
    <div
      className={`dropdown ${isDropdownVisible ? 'show' : ''}`}
      onClick={mobileDevice ? handleToggleDropdown : undefined}
      onMouseEnter={!mobileDevice ? handleMouseEnter : undefined}
      onMouseLeave={!mobileDevice ? handleMouseLeave : undefined}
    >
      <img src={currentConfig.flag} className="flag" alt="flag" />
      <button
        className={`btn btn-secondary dropdown-toggle flag-button ${getTextColorClass()}`}
        type="button"
        aria-expanded={isDropdownVisible}
      >
        <span className='flag-text'>{currentConfig.name}</span>
        <img
          src={textColor === "sunny" ? sunnyArrowImage : arrowImage}
          className={getArrowClassNames()}
          alt="arrow"
        />
      </button>
      <ul
        className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}
        onClick={mobileDevice ? handleToggleDropdown : undefined}
        onMouseEnter={!mobileDevice ? handleMouseEnter : undefined}
        onMouseLeave={!mobileDevice ? handleMouseLeave : undefined}
        style={{ color: "black", top: "40px" }}
      >
        {otherLangs.map((lang) => (
          <li key={lang} onClick={() => handleClickLanguage(lang)}>
            <a className="dropdown-item dropdown-with-flag d-flex" style={{ cursor: 'pointer' }}>
              <img src={languageConfig[lang].flag} className="flag" alt="flag" />
              {languageConfig[lang].name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

LanguageSwitcher.propTypes = {
  textColor: PropTypes.string
};

export default LanguageSwitcher;
