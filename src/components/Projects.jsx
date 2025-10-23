// Projects.jsx
import { useState, useEffect } from 'react'
import "../styles/Projects.css"
import Row from "./Row.jsx"
import PropTypes from 'prop-types';
import Clients from './Clients.jsx'

function Projects({ thereAreTitleAndClients = false, backgroundColor = "black", paddingTopBottom = "100px", filterFunction = undefined, items = null }) {
  const [rowsProjects, setRowsProjects] = useState([])

  useEffect(() => {
    // Only use items from props - no mock/fallback data
    if (!items || items.length === 0) {
      setRowsProjects([]);
      return;
    }

    const filteredItems = filterFunction ? [...items].filter(filterFunction) : items;

    // Group items into rows
    const rows = [];
    for (let i = 0; i < filteredItems.length; i += 4) {
      rows.push(
        <Row
          key={i}
          items={filteredItems.slice(i, i + 4)}
          height={rows.length % 2 === 0 ? undefined : "non-default"}
          nameOfItem={"service"}
        />
      );
    }

    // Update state with the computed rows
    setRowsProjects(rows);
  }, [filterFunction, items]);

  // Don't render anything when there are no items - return null instead of empty section
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className='projects'
      style={{
        backgroundColor: backgroundColor,
        paddingTop: paddingTopBottom,
        paddingBottom: paddingTopBottom,
      }}
    >
      {thereAreTitleAndClients && <h2>Projects highlights</h2>}
      {rowsProjects}
      {thereAreTitleAndClients && <Clients />}
    </section>
  );
}

Projects.propTypes = {
  thereAreTitleAndClients: PropTypes.bool,
  backgroundColor: PropTypes.string,
  paddingTopBottom: PropTypes.string,
  filterFunction: PropTypes.func,
  items: PropTypes.array
}

export default Projects;
