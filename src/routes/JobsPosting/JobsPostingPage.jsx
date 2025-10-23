import { Link, Navigate, useParams } from 'react-router-dom';
import jobsData from './data/jobs.json'; // Adjust the path as necessary
import { getDateDifference } from "../../parseData/parsingFunctions"
import ModalBox from '../../components/ModalBox';
import Markdown from 'react-markdown'

import star from "/images/star.png"

import "./JobsPostingPage.css"
import Button from '../../components/Button';

function JobsPostingPage() {
    const { jobId } = useParams(); // jobId will be a string

    // Find the job details based on jobId
    const jobDetails = jobsData.find(job => job.id === jobId); // Compare as strings
    // If jobDetails is not found, redirect to a 404 page or another route
    if (!jobDetails) {
        return <Navigate to="404" replace={true}/>
    }

    
    const mappingSections = (title, list, isFirst = false) => {       
        return (
            <div className={`width-100 d-flex flex-column jobs-posting-section ${isFirst ? "first-job-posting": ""}`}>
                <h2 className='m-0 font-weight-500 job-posting-section-heading text-dark'>{title}</h2>
                <ul className='d-flex flex-column p-0 m-0'>
                    {list.map(item => 
                        <li key={item} className='width-100 d-flex gap-16'>
                            <div className='job-posting-marker d-flex justify-content-center align-items-center'>
                                <div className='job-posting-circle d-flex justify-content-center align-items-center'>
                                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 4L6 8L12 2" stroke="#FEB700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <Markdown>{item}</Markdown>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

    return (
        <main style={{backgroundColor:'white', gap:'0px', paddingTop:'168px'}} id='main-job-posting'>
            <section className='d-flex flex-column job-content-section'>
                <div className='width-100 position-relative'>
                    <h1 className='font-title font-weight-500 m-0'>{jobDetails.jobTitle}</h1>
                    <h2 className='font-inter job-location opacity-50 m-0'>{jobDetails.location} · {jobDetails.type} · {getDateDifference(new Date(jobDetails.date))}</h2>
                    <Link className='back-on-history-button' to="/careers">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 9L9.5 1M9.5 1H1.5M9.5 1V9" stroke="black" strokeWidth="2" strokeLinecap="square"/>
                        </svg>
                    </Link>
                </div>

                {mappingSections(jobDetails.firstSectionHeading, jobDetails.firstSectionList, true)}

                {mappingSections(jobDetails.secondSectionHeading, jobDetails.secondSectionList)}

                {mappingSections(jobDetails.thirdSectionHeading, jobDetails.thirdSectionList)}

                {mappingSections(jobDetails.fourthSectionHeading, jobDetails.fourthSectionList)}

                <p className='font-weight-400 font-size-16 line-height-24'>
                    We hire talented and passionate people from a variety of backgrounds because we want our global employee base to represent the wide diversity of our customers. If you are excited about a role but your past experience does not align perfectly with every bullet point listed in the job description, we still encourage you to apply. If you are a builder at heart, share our company values, and enthusiastic about growing the digital world, we want to hear from you.
                </p>
            </section>
            <section className='width-100 jobs-posting-message-box d-flex justify-content-center align-items-center'>
                <div className='blue-box-container'>
                    <ModalBox 
                        width='534px' 
                        imageSrc={star}
                        mainText="Send us your resume and we will get back as soon as possible" title="Sounds interesting?" 
                        buttonComponents={[
                            <Button 
                                key="apply now" 
                                text='apply now'
                                arrowTilt='right' 
                                widthDefaultButton='100%'
                                nonDefaultSize={true}
                                type="button"
                            />
                        ]}
                    />
                </div>
            </section>
        </main>
    );
}

export default JobsPostingPage;