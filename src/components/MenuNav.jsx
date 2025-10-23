import { useState, useCallback, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import "../styles/MenuNav.css";
import arrowImage from "/images/arrow.svg";
import sunnyArrowImage from "/images/sunny-arrow.svg";
import romanian from "/images/romanian.svg";
import russian from "/images/russian.svg";
import israilean from "/images/israilean.svg";
import english from "/images/english.svg";
import { PropTypes } from "prop-types";

const MenuNav = ({ textColor = "white", title = "Placeholder", itemsDroplist = [], itemsHiddenDropList = []}) => {
  const [arrowSide, setArrowSide] = useState("down");
  const [language, setLanguage] = useState(title);
  const [items, setItemsDropList] = useState(itemsDroplist);
  const location = useLocation();

  const mobileDevice = window.innerWidth < 1110 ? true : false;

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const timeoutRef = useRef(null);  // A ref to hold the timeout ID

  // Show dropdown on hover
  const handleMouseEnter = () => {
    // Clear any pending timeout to hide the dropdown
    clearTimeout(timeoutRef.current);
    setIsDropdownVisible(true);
    handleToggle("up")
  };

  // Hide dropdown on mouse leave with a delay
  const handleMouseLeave = () => {
    // Start a timeout to delay hiding the dropdown
    timeoutRef.current = setTimeout(() => {
      handleToggle("down")
      setIsDropdownVisible(false);
    }, 100);  // Adjust the delay as needed
  };

  const handleToggleDropdown = () => {
    setIsDropdownVisible(prev => !prev);
    handleToggle(isDropdownVisible ? "down" : "up");
  };

  // Check if any item in the dropdown is active
  const isAnyItemActive = items.some(item => location.pathname === item.link);

  // Check if any hidden droplist item is active
  const isHiddenItemActive = itemsHiddenDropList.some(pattern => {
    const regex = new RegExp(pattern.replace(/:[^\s/]+/g, '([^\\s/]+)'));
    return regex.test(location.pathname);
  });

  // Determine button text color based on active state
  const buttonTextColor = isAnyItemActive || isHiddenItemActive ? 'nav-link-active' : undefined;

  const handleClickLanguage = (e) => {
    const selectedLanguage = e.target.textContent;
    const flagAndName = getFlagAndNameOfLanguage(selectedLanguage);
    if (flagAndName) {
      setLanguage(selectedLanguage);
      const updatedList = [language, ...items].filter(item => item !== selectedLanguage);
      setItemsDropList(updatedList);
    }
    setIsDropdownVisible(false)
    handleToggle("down");
  };

  const handleToggle = useCallback((arrowSide = "down") => {
    if (arrowSide === "down") {
      setArrowSide("down")
    }
    else {
      setArrowSide("up")
    }
  }, []);

  const getFlagAndNameOfLanguage = (name) => {
    switch (name.toLowerCase()) {
      case "english":
        return [english, "english"];
      case "romanian":
        return [romanian, "romanian"];
      case "russian":
        return [russian, "russian"];
      case "israilean":
        return [israilean, "israilean"];
      default:
        return null;
    }
  };

  const getTextColorClass = () => {
    let colorText = textColor;
    switch (colorText) {
      case "white":
        colorText = "text-white";
        break;
      case "sunny":
        colorText = "sunny";
        break;
      default:
        colorText = "black";
        break;
    }
    if (buttonTextColor) {
      colorText = "sunny"
    }
    return colorText;
  };

  const getArrowClassNames = () => {
    const getArrowColor = () => {
      let colorArrow = textColor;
      if (colorArrow === "white") return "white-color-svg";
      return undefined;
    }

    const baseClass = "arrow";
    const directionClass = arrowSide === "up" ? "up" : "";
    return `${baseClass} ${directionClass} ${Boolean(buttonTextColor) === false && getArrowColor()}`;
  };

  const flagAndName = getFlagAndNameOfLanguage(language);

  if (flagAndName !== null) {
    return(
      <div
        className={`dropdown ${isDropdownVisible ? 'show' : ''}`} 
        onClick={mobileDevice ? handleToggleDropdown : undefined}
        onMouseEnter={!mobileDevice ? handleMouseEnter: undefined}
        onMouseLeave={!mobileDevice ? handleMouseLeave : undefined}
      >
        <img src={flagAndName[0]} className="flag" alt="flag" />
        <button 
          className={`btn btn-secondary dropdown-toggle flag-button ${getTextColorClass() !== "text-white" ? getTextColorClass() : "text-white"}`} 
          type="button" 
          aria-expanded={isDropdownVisible} 
        >
        <span className='flag-text'>{flagAndName[1]}</span>
          <img src={textColor === "sunny" ? sunnyArrowImage : arrowImage} className={getArrowClassNames()} alt="arrow" />
        </button>
        <ul 
          className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}
          onClick={mobileDevice ? handleToggleDropdown : undefined}
          onMouseEnter={!mobileDevice ? handleMouseEnter: undefined}
          onMouseLeave={!mobileDevice ? handleMouseLeave : undefined}
          style={{color: "black", top: "40px"}}
        >
          {items.map((item, index) => (
            <li key={index} onClick={handleClickLanguage}>
              <a className="dropdown-item dropdown-with-flag d-flex" data-target="#">
              <img src={getFlagAndNameOfLanguage(item)[0]} className="flag" alt="flag" />
              {item}</a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div       
      className={`dropdown ${isDropdownVisible ? 'show' : ''}`} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={`btn btn-secondary dropdown-toggle ${getTextColorClass()} ${buttonTextColor}`} 
        type="button" 
        aria-expanded={isDropdownVisible} 
      >
        {title}
        <img src={textColor === "sunny" || buttonTextColor === "nav-link-active" ? sunnyArrowImage : arrowImage} className={getArrowClassNames()} alt="arrow" />
      </button>
      <ul 
        className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}
        onMouseEnter={handleMouseEnter}  // Ensure the dropdown stays visible when hovering over it
        onMouseLeave={handleMouseLeave}  // Hide the dropdown when leaving the list
        onClick={handleClickLanguage}
        style={{color: "black", top: "40px"}}
      >
        {items.map((item, index) => (
            <li key={index} onClick={()=> handleToggle("down")}>
              <NavLink className="dropdown-item" to={item.link}>{item.name}</NavLink>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

MenuNav.propTypes = {
  textColor: PropTypes.string,
  title: PropTypes.string, 
  itemsDroplist: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })), 
  itemsHiddenDropList: PropTypes.arrayOf(PropTypes.string), 
}

export default MenuNav;
