import "../styles/Footer.css"
import backgroundImage from "/images/background-image-blue-clouds.jpg"
import { Link } from 'react-router-dom'
import { useModalBoxesContext } from './useModalBoxesContext'
import Button from "./Button"

function Footer() {
    const {handleClickJob} = useModalBoxesContext()

    const contacts = [
        {
            phone : "+373 (78) 158 337",
            location : "Moldova",
        },
        {
            phone : "+972 558-5556-42",
            location : "Israel",
        },
        {
            phone : "Monday – Friday, 09:00 – 18:00",
            location : "Working hours",
        },
        
    ]
  return (
    <footer>
        <div id='footer-head'>
            <div id='footer-contacts'>
                <h2 id='footer-heading'>
                    info@ishunea.io
                </h2> 
                <div id='footer-contacts-list'>
                {contacts.map(contact => {
                    return (
                        <div className='footer-contacts-list-items' key={contact.phone}>
                            <div>
                                <p className='number-phone'>
                                    {contact.phone}
                                </p>

                                <p className='location'>
                                    {contact.location}
                                </p>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
            <div id='footer-action'>
                <Button type="button" text="request a call" handleClick={handleClickJob} nonDefaultSize={true} widthDefaultButton="100%"/>
            </div>
        </div>

        <div id='copyright'>
            <div id="social">
                <p className='footer-copyright-items'>
                    Facebook
                </p>
                <p className='footer-copyright-items'>
                    Instagram
                </p>
                <p className='footer-copyright-items'>
                    Linkedin
                </p>
            </div>

            <div id='legal'>
                <Link to="/terms_conditions" className='footer-copyright-items' onClick={() => window.scroll(0, 0)}>
                    Terms & Conditions
                </Link>
                <p id='copyright-text'>
                    © 2019 - 2022 iShunea. All rights reserved
                </p>
            </div>
        </div>
        <img className='background-image' src={backgroundImage}></img>
    </footer>
  )
}

export default Footer