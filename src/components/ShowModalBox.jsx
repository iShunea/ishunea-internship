import { Link, Outlet } from "react-router-dom";
import IconIshunea from "./IconIshunea";
import { useEffect, useRef, useState } from "react";
import phoneCountryCode from './phone_country_code.json';
import { CustomNavLink } from './Header'
import { useModalBoxesContext } from "./useModalBoxesContext";
import ModalBox from "./ModalBox";
import "../styles/ShowModalBox.css"
import Button from "./Button";
import PropTypes from 'prop-types';

function ShowModalBox() {
    const { 
        isShownCall,
        handleClickCall, 
        isShownJob, 
        handleClickJob,
        isShownAlert,
        handleClickAlert, 
        isShownSent,
        handleClickSent, 
        isShownNewsLetterConfirmation,
        handleClickNewsLetter, 
        isShownMobNavbar, 
        handleClickMobNavbar
    } = useModalBoxesContext();

    const isShown = () => {
        return isShownCall || isShownJob || isShownAlert || isShownSent || isShownNewsLetterConfirmation || isShownMobNavbar;
    }
    
  return (
    <>
        {/* Modal Mobile Navbar */}
        {isShownMobNavbar && 
            <ShowMobNavbar isShownMobNavbar={isShownMobNavbar} handleClickMobNavbar={handleClickMobNavbar}/>
        }
  
        {/* Modal News Letter */}
        {isShownNewsLetterConfirmation && 
          <ShowNewsLetter isShownNewsLetterConfirmation={isShownNewsLetterConfirmation} handleClickNewsLetter={handleClickNewsLetter}/>
        }
  
        {/* Modal Sent */}
        {isShownSent && 
          <ShowSent isShownSent={isShownSent} handleClickSent={handleClickSent}/>
        }
  
        {/* Modal  Call*/}
        {isShownCall &&
         <ShowCall isShownCall={isShownCall} handleClickCall={handleClickCall}/>
        }
  
        {/* Modal Job */}
        {isShownJob && 
          <ShowJob isShownJob={isShownJob} handleClickJob={handleClickJob}/>
        }
  
        {/* Modal Alert */}
        {isShownAlert && 
          <ShowAlert isShownAlert={isShownAlert} handleClickAlert={handleClickAlert}/>
        }
        {!isShown() && <Outlet/>}
    </>
  )
}

export default ShowModalBox

  
const ShowMobNavbar = ({isShownMobNavbar = true, handleClickMobNavbar = () => {}}) => {
    return (
        <div className={`modal-container ${isShownMobNavbar ? 'show' : ''}`}>
            <Link to="/" onClick={handleClickMobNavbar} className='modal-icon'><IconIshunea color="#000000"/></Link>
            <button type='button' className='modal-button' onClick={handleClickMobNavbar}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M1 25L25 1M1 1L25 25" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <div className='width-100 d-flex justify-content-center align-items-center' id="flex-container-mobile-navbar">
                <div className='gap-40 d-flex flex-column justify-content-center align-items-center'>
                    {["services", "about", "careers", "blogs", "works", "contacts"].map(link => 
                    <CustomNavLink textColor="black" name={link} clickHandle={handleClickMobNavbar} key={link}/>
                    )}
                </div>
            </div>
        </div>
    )
}

ShowMobNavbar.propTypes = {
    isShownMobNavbar: PropTypes.bool.isRequired,
    handleClickMobNavbar: PropTypes.func.isRequired
}


const ShowSent = ({isShownSent = true, handleClickSent = () => {}}) => {
    return (
        <div className={`modal-container ${isShownSent ? 'show' : ''}`} id="show-sent">
            <Link to="/" onClick={handleClickSent} className='modal-icon'><IconIshunea color="#000000"/></Link>
            <button type='button' className='modal-button' onClick={handleClickSent}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M1 25L25 1M1 1L25 25" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            <ModalBox 
            width="100%" 
            title="You are subscribed!" 
            imageSrc='/images/chat.png'
            buttonComponents={[
                <Button type="button" text="continue" handleClick={handleClickSent} key={"continue"} arrowTilt="right" widthDefaultButton="100%"/>
            ]}
            mainText="Once a week you will get a digest on our latestupdates or community insights without spam"/>
        </div>
    )
}

ShowSent.propTypes = {
    isShownSent: PropTypes.bool.isRequired,
    handleClickSent: PropTypes.func.isRequired,
}

const ShowNewsLetter = ({isShownNewsLetterConfirmation = true, handleClickNewsLetter = () => {}}) => {
    return (
        <div className={`modal-container show-sent ${isShownNewsLetterConfirmation ? 'show' : ''}`} id="show-news-letter-confirmation">
            <Link to="/" onClick={handleClickNewsLetter} className='modal-icon'><IconIshunea color="#000000"/></Link>
            <button type='button' className='modal-button' onClick={handleClickNewsLetter}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M1 25L25 1M1 1L25 25" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            <ModalBox 
                width="100%"
                title="Message successfuly sent" 
                imageSrc='/images/chat.png'
                buttonComponents={[
                    <Button type="button" text="continue" handleClick={handleClickNewsLetter} key={"continue"} arrowTilt="right" widthDefaultButton="100%"/>
                ]}
            mainText="We will get back as soon as possible"/>
        </div>
    )
}

ShowNewsLetter.propTypes = {
    isShownNewsLetterConfirmation: PropTypes.bool.isRequired,
    handleClickNewsLetter: PropTypes.func.isRequired
}

const ShowAlert = ({isShownAlert = true, handleClickAlert = () => {}}) => {
    const selectHiddenElement = useRef(null);
    const heightTextArea = window.innerWidth > 768 ? 8 : window.innerWidth > 400 ? 15 : 20; 
    const { handleClickNewsLetter } = useModalBoxesContext();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        errorType: '',
        message: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleHideSelectElement = () => {
        if (selectHiddenElement) {
            selectHiddenElement.current.hidden = true;
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName || formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.errorType) {
            newErrors.errorType = 'Please select an error type';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must accept the Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "form_submit",
                form_name: "error_report",
                form_type: "alert",
                form_data: {
                    error_type: formData.errorType,
                    has_message: !!formData.message
                }
            });

            setFormData({
                fullName: '',
                email: '',
                errorType: '',
                message: '',
                agreeTerms: false
            });
            setErrors({});
            
            handleClickAlert();
            handleClickNewsLetter();

        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`modal-container ${isShownAlert ? 'show' : ''}`}>
            <Link to="/" onClick={handleClickAlert} className='modal-icon'><IconIshunea color="#000000"/></Link>
            <button type='button' className='modal-button' onClick={handleClickAlert}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M1 25L25 1M1 1L25 25" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>

            <h4 className='m-0 font-title'>Alert an error</h4>
            <form className='d-flex flex-column gap-16 form-root' onSubmit={handleSubmit}>
                <div>
                    <input 
                        className={`input-root ${errors.fullName ? 'input-error' : ''}`}
                        type='text' 
                        placeholder='Full name' 
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleInputChange}
                        minLength="2"
                    />
                    {errors.fullName && <span className='error-text'>{errors.fullName}</span>}
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder='E-mail address' 
                        className={`input-root ${errors.email ? 'input-error' : ''}`}
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className='error-text'>{errors.email}</span>}
                </div>
                <div>
                    <select 
                        name="errorType" 
                        id='error-type' 
                        className={`input-root ${errors.errorType ? 'input-error' : ''}`}
                        value={formData.errorType}
                        onChange={handleInputChange}
                        onClick={handleHideSelectElement}
                    >
                        <option value="" ref={selectHiddenElement}>Error type</option>
                        <option value="compatibility-error">Compatibility error</option>
                        <option value="slow-loading-time">Slow loading time</option>
                        <option value="connection-error">Connection error</option>
                        <option value="image-loading-error">Image loading error</option>
                        <option value="form-error">Form error</option>
                        <option value="404">404 - Page not found</option>
                    </select>
                    {errors.errorType && <span className='error-text'>{errors.errorType}</span>}
                </div>
                <textarea 
                    rows={heightTextArea} 
                    placeholder='Short message' 
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                />
                <div className='attach-file-wrapper position-relative'>
                    <img className='attach-file-icon' src='/images/attach-file-icon.svg' alt="attach-file-icon"/>
                    <div className='d-flex flex-column'>
                        <p className='font-weight-500 line-height-24 font-size-16 text-dark m-0'>Attach file</p>
                        <p className='font-weight-400 line-height-18 font-size-12 opacity-50 font-weight-400 m-0'>PDF, DOCX up to 20 MB</p>
                        <input type="file" id='attach-file-alert' accept=".pdf,.docx" className='input-root-hidden'/>
                    </div>
                </div>
                <div>
                    <div className='d-flex gap-16 align-items-center'>
                        <input 
                            type='checkbox' 
                            id='agree-with-terms-alert' 
                            className='checkbox-hidden'
                            name='agreeTerms'
                            checked={formData.agreeTerms}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="agree-with-terms-alert" className='checkmark'>
                            <span/>
                            <div>
                                I accept the <b><Link className='text-dark' to="/terms_conditions" onClick={handleClickAlert}>Terms & Conditions</Link></b> of user data processing
                            </div>
                        </label>
                    </div>
                    {errors.agreeTerms && <span className='error-text'>{errors.agreeTerms}</span>}
                </div>
                {errors.submit && <span className='error-text'>{errors.submit}</span>}

                <div className='send-message-container'>
                    <Button 
                        text={isSubmitting ? "sending..." : "send message"} 
                        nonDefaultSize={true} 
                        widthDefaultButton="100%"
                        type="submit"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    )
}

ShowAlert.propTypes = {
    isShownAlert: PropTypes.bool.isRequired,
    handleClickAlert: PropTypes.func.isRequired
}

const ShowCall = ({isShownCall = true, handleClickCall = () => {}}) => {
    const heightTextArea = window.innerWidth > 768 ? 8 : window.innerWidth > 400 ? 15 : 20; 
    const { handleClickNewsLetter } = useModalBoxesContext();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        message: '',
        agreeTerms: false
    });

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName || formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        const phoneRegex = /^[0-9]{6,15}$/;
        if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must accept the Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "form_submit",
                form_name: "contact_form",
                form_type: "request_call",
                form_data: {
                    country_code: selectedCountry?.code || '+373',
                    has_message: !!formData.message
                }
            });

            setFormData({
                fullName: '',
                phone: '',
                email: '',
                message: '',
                agreeTerms: false
            });
            setErrors({});
            
            handleClickCall();
            handleClickNewsLetter();

        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`modal-container ${isShownCall ? 'show' : ''}`}>
            <Link to="/" onClick={handleClickCall} className='modal-icon'><IconIshunea color="#000000"/></Link>
            <button type='button' className='modal-button' onClick={handleClickCall}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M1 25L25 1M1 1L25 25" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <h4 className='m-0 font-title'>Request a call</h4>
            <form className='d-flex flex-column gap-16 form-root' onSubmit={handleSubmit}>
                <div>
                    <input 
                        className={`input-root ${errors.fullName ? 'input-error' : ''}`}
                        type='text' 
                        placeholder='Full name' 
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleInputChange}
                        minLength="2"
                    />
                    {errors.fullName && <span className='error-text'>{errors.fullName}</span>}
                </div>
                <div>
                    <span className={`input-root ${errors.phone ? 'input-error' : ''}`}>
                        <PhoneCountrySelect onCountryChange={setSelectedCountry}/>
                        <input 
                            type="tel" 
                            placeholder='Phone number' 
                            name='phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </span>
                    {errors.phone && <span className='error-text'>{errors.phone}</span>}
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder='E-mail address' 
                        className={`input-root ${errors.email ? 'input-error' : ''}`}
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className='error-text'>{errors.email}</span>}
                </div>
                <textarea 
                    rows={heightTextArea} 
                    placeholder='Short message' 
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                />
                <div className='attach-file-wrapper position-relative'>
                    <img className='attach-file-icon' src='/images/attach-file-icon.svg' alt="attach-file-icon"/>
                    <div className='d-flex flex-column'>
                        <p className='font-weight-500 line-height-24 font-size-16 text-dark m-0'>Attach file</p>
                        <p className='font-weight-400 line-height-18 font-size-12 opacity-50 font-weight-400 m-0'>PDF, DOCX up to 20 MB</p>
                        <input type="file" id='attach-file' accept=".pdf,.docx" className='input-root-hidden'/>
                    </div>
                </div>
                <div>
                    <div className='d-flex gap-16 align-items-center'>
                        <input 
                            type='checkbox' 
                            id='agree-with-terms' 
                            className='checkbox-hidden'
                            name='agreeTerms'
                            checked={formData.agreeTerms}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="agree-with-terms" className='checkmark'>
                            <span/>
                            <div>
                                I accept the <b><Link className='text-dark' to="/terms_conditions" onClick={handleClickCall}>Terms & Conditions</Link></b> of user data processing
                            </div>
                        </label>
                    </div>
                    {errors.agreeTerms && <span className='error-text'>{errors.agreeTerms}</span>}
                </div>
                {errors.submit && <span className='error-text'>{errors.submit}</span>}

                <div className='send-message-container'>
                    <Button 
                        text={isSubmitting ? "sending..." : "send message"} 
                        nonDefaultSize={true} 
                        widthDefaultButton="100%"
                        type="submit"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    )
}

ShowCall.propTypes = {
    isShownCall: PropTypes.bool.isRequired,
    handleClickCall: PropTypes.func.isRequired,
}

const ShowJob = ({isShownJob = true, handleClickJob = () => {}}) => {
    const heightTextArea = window.innerWidth > 768 ? 8 : window.innerWidth > 400 ? 15 : 20; 
    const { handleClickNewsLetter } = useModalBoxesContext();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        message: '',
        agreeTerms: false
    });

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.fullName || formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        const phoneRegex = /^[0-9]{6,15}$/;
        if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'You must accept the Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "form_submit",
                form_name: "job_application",
                form_type: "careers",
                form_data: {
                    country_code: selectedCountry?.code || '+373',
                    has_message: !!formData.message
                }
            });

            setFormData({
                fullName: '',
                phone: '',
                email: '',
                message: '',
                agreeTerms: false
            });
            setErrors({});
            
            handleClickJob();
            handleClickNewsLetter();

        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`modal-container ${isShownJob ? 'show' : ''}`}>
            <Link to="/" onClick={handleClickJob} className='modal-icon'><IconIshunea color="#000000"/></Link>
            <button type='button' className='modal-button' onClick={handleClickJob}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3" d="M1 25L25 1M1 1L25 25" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </button>
            <h4 className='m-0 font-title'>Send a message</h4>
            <form className='d-flex flex-column gap-16 form-root' onSubmit={handleSubmit}>
                <div>
                    <input 
                        className={`input-root ${errors.fullName ? 'input-error' : ''}`}
                        type='text' 
                        placeholder='Full name' 
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleInputChange}
                        minLength="2"
                    />
                    {errors.fullName && <span className='error-text'>{errors.fullName}</span>}
                </div>
                <div>
                    <span className={`input-root ${errors.phone ? 'input-error' : ''}`}>
                        <PhoneCountrySelect onCountryChange={setSelectedCountry}/>
                        <input 
                            type="tel" 
                            placeholder='Phone number' 
                            name='phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </span>
                    {errors.phone && <span className='error-text'>{errors.phone}</span>}
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder='E-mail address' 
                        className={`input-root ${errors.email ? 'input-error' : ''}`}
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className='error-text'>{errors.email}</span>}
                </div>
                <textarea 
                    rows={heightTextArea} 
                    placeholder='Short message' 
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                />
                <div className='attach-file-wrapper position-relative'>
                    <img className='attach-file-icon' src='/images/attach-file-icon.svg' alt="attach-file-icon"/>
                    <div className='d-flex flex-column'>
                        <p className='font-weight-500 line-height-24 font-size-16 text-dark m-0'>Attach file</p>
                        <p className='font-weight-400 line-height-18 font-size-12 opacity-50 font-weight-400 m-0'>PDF, DOCX up to 20 MB</p>
                        <input type="file" id='attach-file-job' accept=".pdf,.docx" className='input-root-hidden'/>
                    </div>
                </div>
                <div>
                    <div className='d-flex gap-16 align-items-center'>
                        <input 
                            type='checkbox' 
                            id='agree-with-terms-job' 
                            className='checkbox-hidden'
                            name='agreeTerms'
                            checked={formData.agreeTerms}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="agree-with-terms-job" className='checkmark'>
                            <span/>
                            <div>
                                I accept the <b><Link className='text-dark' to="/terms_conditions" onClick={handleClickJob}>Terms & Conditions</Link></b> of user data processing
                            </div>
                        </label>
                    </div>
                    {errors.agreeTerms && <span className='error-text'>{errors.agreeTerms}</span>}
                </div>
                {errors.submit && <span className='error-text'>{errors.submit}</span>}

                <div className='send-message-container'>
                    <Button 
                        text={isSubmitting ? "sending..." : "send message"} 
                        nonDefaultSize={true} 
                        widthDefaultButton="100%"
                        type="submit"
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    )
}

ShowJob.propTypes ={
    isShownJob: PropTypes.bool.isRequired,
    handleClickJob: PropTypes.func.isRequired,
}

const PhoneCountrySelect = ({ onCountryChange }) => {
    const [isOpen, setIsOpen] = useState(false); // is drop-down-list open
    const [countryList, setCountryList] = useState([]); // the drop-down-list Country data
    const [countrySelected, setCountrySelected] = useState(); // current selected country
    const countrySelectedRef = useRef(null); // HTMLDivElement ref
    const countryDropdownRef = useRef(null); //  HTMLDivElement ref

    // init countryList base on phoneCountryCode json.
    useEffect(() => {
        const tempCountryList = [];
        phoneCountryCode.forEach((country) => {
        tempCountryList.push({
            countryCode: country['country_code'],
            code: `+${country['phone_code']}`,
            name: country['country_en'],
            visible: true // for search use
        });
        });
        setCountryList(tempCountryList);
        setCountrySelected(tempCountryList[0]); // the first country is default
        if (onCountryChange) {
            onCountryChange(tempCountryList[0]);
        }
    }, []);

    // click to select country
    function itemClickHandler(item) {
        setCountrySelected(item);
        setIsOpen(false);
        if (onCountryChange) {
            onCountryChange(item);
        }
    }

    // toggle dropdown
    function documentClickHandler(event) {
        const target = event.target;
        
        if (countryDropdownRef.current && countryDropdownRef.current.contains(target)) {
        return; // Don't close when clicking inside the dropdown.
        }

        if (countrySelectedRef.current && countrySelectedRef.current.contains(target)) {
        setIsOpen(prev => !prev); // Toggle dropdown open/close on click
        } else {
        setIsOpen(false); // Close dropdown when clicking outside
        }
    }
    useEffect(() => {
        document.addEventListener('click', documentClickHandler);
        return () => {
        document.removeEventListener('click', documentClickHandler);
        };
    }, []);

    // search by code or name
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        if (countryList.length < 1) return; // countryList data must be loaded
        let newCountryList;
        if (searchText && searchText.length > 0) {
        newCountryList = countryList.map((country) => {
            if (
            country.name.toLowerCase().includes(searchText.toLowerCase()) ||
            country.code.toString().includes(searchText)
            ) {
            country.visible = true;
            } else {
            country.visible = false;
            }
            return country;
        });
        } else {
        newCountryList = countryList.map((country) => {
            country.visible = true;
            return country;
        });
        }
        setCountryList(newCountryList);
    }, [searchText]);

    return (
        <div className="phone-country-select-container">
            <div className="phone-country-select-selected" ref={countrySelectedRef}>
                {countrySelected && countrySelected.countryCode && (
                <>
                    <FlagSvg code={countrySelected.countryCode} />
                    {/* <span className="phone-country-select-selected-name">{countrySelected.name}</span> */}
                    <span className="phone-country-select-selected-code">{countrySelected.code}</span>
                </>
                )}
            </div>
            <div
                className={'phone-country-select-dropdown ' + (isOpen ? 'open' : 'closed')}
                ref={countryDropdownRef}
            >
                <div className="phone-country-select-search">
                    <input
                        type="text"
                        placeholder="Search by Name or Code"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <img src="/images/clear.svg" style={{filter: "invert(1)"}} onClick={() => setSearchText('')} />
                </div>
                <ul>
                {countryList.map((item, index) => (
                    <li
                    key={index}
                    onClick={() => itemClickHandler(item)}
                    className={item.visible ? 'show' : 'hide'}
                    >
                        <FlagSvg code={item.countryCode} />
                        <span className="phone-country-select-list-name">{item.name}</span>
                        <span className="phone-country-select-list-code">{item.code}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

const FlagSvg = ({ code }) => {
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        // const svgUrl = await import(`./flags/${code}.svg?raw`);
        const svgUrl = new URL(`./flags/${code}.svg`, import.meta.url).href
        //  const response = await fetch(svgUrl.default);
        // const content = await response.text();
        setData(svgUrl);
        };
        fetchData().catch(console.error);
    }, [code]);

    return (
        <img src={data}/>
    );
};

FlagSvg.propTypes = {
    code: PropTypes.string   
}

PhoneCountrySelect.propTypes = {
    onCountryChange: PropTypes.func
}

