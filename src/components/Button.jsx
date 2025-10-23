import { HashLink } from "react-router-hash-link";
import "../styles/Button.css"; // Assuming you'll merge styles into one file
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function Button({
  text = "",
  arrowPosition = "right",
  arrowTilt = "up",
  color = "default",
  borderColor = null,
  handleClick = null,
  visitExternalLink = null,
  hashLink = null,
  link = null,
  nonDefaultSize = false,
  widthDefaultButton = "auto",
  height = "48px", // New prop for height control with a default value
  type = "submit", // new prop to differentiate between button and link
}) {
  const renderArrow = () => (
    <svg
      className={`button-arrow m-0 right ${arrowTilt === "up" ? "up-tilted" : ""}`}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 9L9.5 1M9.5 1H1.5M9.5 1V9"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );

  const buttonContent = (
    <>
      {text}
      {arrowPosition === "right" && renderArrow()}
    </>
  );

  const commonClassNames = `
    button 
    ${color !== "default" ? 'non-default-button-color' : 'default-button-color'} 
    ${nonDefaultSize ? "button-non-default-size" : ""} 
  `;



  // If the button should act as a link (internal or external)
  if (link || visitExternalLink || hashLink) {
    return link ? (
      <Link to={link} className={commonClassNames} style={{ height }}>
        {buttonContent}
      </Link>
    ) : hashLink ? (
      <HashLink to={hashLink} className={commonClassNames} style={{ height }}>
        {buttonContent}
      </HashLink>
    ): (
      <a href={visitExternalLink} className={commonClassNames} style={{ height, width: widthDefaultButton }}>
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 9H1.5M17.5 9C17.5 6.56696 16.4139 4.3876 14.7 2.92033M17.5 9C17.5 11.433 16.4139 13.6124 14.7 15.0797M1.5 9C1.5 11.433 2.58614 13.6124 4.3 15.0797M1.5 9C1.5 6.56696 2.58613 4.38759 4.29999 2.92033M4.3 15.0797C6.01386 13.6124 7.1 11.433 7.1 9C7.1 6.56696 6.01386 4.38759 4.29999 2.92033M4.3 15.0797C5.69842 16.2769 7.51476 17 9.5 17C11.4852 17 13.3016 16.2769 14.7 15.0797M4.29999 2.92033C5.69842 1.72311 7.51476 1 9.5 1C11.4852 1 13.3016 1.72312 14.7 2.92033M14.7 2.92033C12.9861 4.3876 11.9 6.56696 11.9 9C11.9 11.433 12.9861 13.6124 14.7 15.0797" stroke="black" strokeWidth="2"/>
        </svg>
        {text}
      </a>
    );
  }

  // Regular button with optional click handler
  return (
    <button
      onClick={handleClick || undefined}
      className={commonClassNames}
      style={{ borderColor, width: widthDefaultButton, height }}
      type={type}
    >
      {buttonContent}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  arrowPosition: PropTypes.oneOf(['left', 'right']),
  arrowTilt: PropTypes.oneOf(['up', 'down']),
  color: PropTypes.string,
  borderColor: PropTypes.string,
  handleClick: PropTypes.func,
  visitExternalLink: PropTypes.string,
  hashLink: PropTypes.string,
  link: PropTypes.string,
  nonDefaultSize: PropTypes.bool,
  widthDefaultButton: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Adjust based on your needs
};


export default Button;
