import "../styles/ListCareers.css"
import { getDateDifference } from "../parseData/parsingFunctions"
import { Link } from 'react-router-dom'
import { PropTypes } from "prop-types";

function ListCareers({jobs}) {

return (
        <div className='d-flex flex-column justify-content-center align-items-center about-careers-list'>
            {jobs.map((job, index) => {
                return (
                    <Link className='job-item' key={index} to={job.link}>
                        <div className='job-content d-flex justify-content-start align-items-center'>
                            <div className='job-offer-title text-dark text-start'>{job.title}</div>
                            <div className='job-description text-dark text-start job-country'>{job.country}</div>
                            <div className='job-description text-dark text-start job-date'>{getDateDifference(job.date)}</div>
                        </div>
                        <div className='d-flex justify-content-center align-items-center button-for-jobs'>
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 9L9.5 1M9.5 1H1.5M9.5 1V9" stroke="black" strokeWidth="2" strokeLinecap="square"/>
                            </svg>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

ListCareers.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            date: PropTypes.instanceOf(Date).isRequired
        })
    )
}

export default ListCareers