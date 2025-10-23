import "../styles/MemberItem.css"
import { PropTypes } from "prop-types";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function MemberItem({member}) {
    const Icon = (logoType) => {
        function socialMediaIcon (logoType) {
            switch (logoType) {
                case "facebook":
                    return (
                        <svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.69874 0.00332907L5.77991 0C3.62416 0 2.23102 1.54552 2.23102 3.93762V5.75313H0.301719C0.135004 5.75313 0 5.89927 0 6.07954V8.71001C0 8.89028 0.135158 9.03625 0.301719 9.03625H2.23102V15.6738C2.23102 15.854 2.36603 16 2.53274 16H5.04993C5.21665 16 5.35165 15.8539 5.35165 15.6738V9.03625H7.60746C7.77417 9.03625 7.90918 8.89028 7.90918 8.71001L7.9101 6.07954C7.9101 5.99299 7.87824 5.91009 7.82174 5.84884C7.76525 5.78758 7.68828 5.75313 7.60823 5.75313H5.35165V4.2141C5.35165 3.47438 5.51467 3.09886 6.40582 3.09886L7.69844 3.09836C7.865 3.09836 8 2.95222 8 2.77211V0.329578C8 0.149642 7.86515 0.00366197 7.69874 0.00332907Z" fill="white"/>
                        </svg>
                    )
                
                case "twitter":
                    return (
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0001 1.65642C17.3376 1.93751 16.6268 2.12814 15.8799 2.21324C16.6425 1.77597 17.2263 1.08239 17.5029 0.258473C16.7876 0.663419 15.998 0.957461 15.1566 1.11686C14.4829 0.428658 13.5246 0 12.4616 0C10.4224 0 8.76893 1.5832 8.76893 3.53473C8.76893 3.81151 8.80155 4.08184 8.86455 4.34034C5.79613 4.19277 3.07527 2.78514 1.25424 0.646183C0.935918 1.16747 0.754829 1.77487 0.754829 2.42325C0.754829 3.64997 1.40721 4.73236 2.39704 5.36562C1.79189 5.34624 1.22274 5.18684 0.724476 4.92189V4.96605C0.724476 6.67849 1.99774 8.10766 3.68604 8.43294C3.37672 8.51264 3.05054 8.5568 2.7131 8.5568C2.47466 8.5568 2.24407 8.53418 2.01798 8.49109C2.48813 9.89659 3.85139 10.9187 5.4666 10.9467C4.20345 11.8944 2.61074 12.4577 0.880829 12.4577C0.58277 12.4577 0.289181 12.4405 0.00012207 12.4093C1.63445 13.4141 3.57472 14 5.66007 14C12.4527 14 16.1656 8.61281 16.1656 3.94077L16.1532 3.48305C16.8787 2.98759 17.5063 2.3651 18.0001 1.65642Z" fill="white"/>
                        </svg>
                    )

                default:
                    return (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.00012207 1.68116C0.00012207 0.753079 0.753201 0 1.68128 0C2.60877 0 3.36185 0.753079 3.36244 1.68116C3.36244 2.60924 2.60936 3.37806 1.68128 3.37806C0.753201 3.37806 0.00012207 2.60924 0.00012207 1.68116Z" fill="white"/>
                            <path d="M14.0001 13.9994V8.86494C14.0001 6.35312 13.4593 4.41821 10.5228 4.41821C9.11115 4.41821 8.16382 5.19287 7.77708 5.92729H7.73624V4.65271H4.952V13.9994H7.85116V9.37127C7.85116 8.15269 8.08216 6.97437 9.59124 6.97437C11.0781 6.97437 11.1003 8.36503 11.1003 9.44944V14L14.0001 13.9994Z" fill="white"/>
                            <path d="M0.231133 4.6532H3.13378V13.9999H0.231133V4.6532Z" fill="white"/>
                        </svg>

                    )
            }
        }
        return (
            <a className='member-social-media-icon' href='#'>
                {socialMediaIcon(logoType)}
            </a>
        )
        
    }
  return (
    <div className='member-item'>
        <div className='member-footer'>
            <div className='member-footer-title'>
                <p className='member-foooter-member-name'>
                    {member.fullName}
                </p>

                <p className='member-footer-member-job'>
                    {member.job}
                </p>
            </div>
        </div>

        <div className='member-social'>
            {Icon("facebook")}
            {Icon("twitter")}
            {Icon("linkedin")}
        </div>

        <LazyLoadImage className='member-image' src={member.imageSrc} alt={member.fullName}/>
    </div>
  )
}

MemberItem.propTypes = {
    member: PropTypes.arrayOf(
        PropTypes.shape({
            fullName: PropTypes.string.isRequired,
            job: PropTypes.string.isRequired,
            imageSrc: PropTypes.string.isRequired,
            socialMedia: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    )
}

export default MemberItem