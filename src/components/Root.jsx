import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTopWrapper from './ScrollToTopWrapper';
import { PropTypes } from "prop-types";

function Root({headerTextColor = "black"}) {
  return (
    <>
      <ScrollToTopWrapper/>
      <Header textColor={headerTextColor.toLowerCase() === 'white' ? 'white' : 'black'} />
        <Outlet />
      <Footer />
    </>
  )
}

Root.propTypes = {
  headerTextColor: PropTypes.string.isRequired,
}

export default Root