import "../styles/Services.css"
import Row from './Row'
import PropTypes from 'prop-types';

function Services({
  rowItems = [], 
  paddingBottom = "100px", 
  title = "We help companies to grow digital",
  isPaddingTop = true
}) { 
  const rows = [];
  for (let i = 0; i < rowItems.length; i += 4) {
      rows.push(<Row key={i} items={rowItems.slice(i, i + 4)} nameOfItem={"service"} />);
  }
  return (
    <section className={`services ${!isPaddingTop ? "services-no-padding-top" : ""}`} style={{paddingBottom: paddingBottom}}>
      <h2 className='service-title'>{title}</h2>
      {rows}
    </section>
  )
}

Services.propTypes = {
  rowItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string,
      imageSrc: PropTypes.string.isRequired,
    })
  ),
  paddingBottom: PropTypes.string, // String for bottom padding
  title: PropTypes.string, // String for the title
  isPaddingTop: PropTypes.bool, // Boolean for top padding
};

export default Services