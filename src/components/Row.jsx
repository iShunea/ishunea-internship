import "../styles/Row.css"
import ServiceItem from './ServiceItem'
import MemberItem from "./MemberItem"
import NewsCards from './NewsCards'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import PropTypes from 'prop-types';


function Row({items = [], nameOfItem = "", height = "default"}) {

    const newsCardsPattern = (height) => {
        return(
            <div className={`row-wrapper`}>
                <div className={`row`}>
                    {items.map((item, index) => 
                        <NewsCards height={height} key={index} item={item}/>
                    )}
                </div>
            </div>
        )
    }
    
    const heightInLowerCase = height.toLowerCase();
    switch (nameOfItem.toLowerCase()) {
        case "service":
            // "minim" case
            if (heightInLowerCase !== "default"){
                return (
                    <div className={`row-wrapper-minimized-service-item row-wrapper`}>
                        <div className={`row-service-item row`}>
                            {items.map((item, index) => 
                                <ServiceItem item={item} height="non-default" key={index}/>
                            )}
                        </div>
                    </div>
                )
            }
            // "default" service-item case
            return (
                <div className={`row-wrapper-default-service-item row-wrapper`}>
                    <div className={`row-service-item row`}>
                        {items.map((item,index) => 
                            <ServiceItem item={item} height="default" key={index}/>
                        )}
                    </div>
                </div>
            )

        case "news-cards":
            if (["l", "m", "s"].includes(heightInLowerCase)) {
                return newsCardsPattern(heightInLowerCase);
            }
            return newsCardsPattern("xl");

        case "members":
            return (
                <div className={`row-wrapper row-wrapper-members`}>
                    <div className={`row row-members`}>
                        {items.map(member => {
                            return (
                                <MemberItem member={member} key={member.fullName}/>
                            )
                        })}
                    </div>
                </div>
            )

        case "gallery":
            return (
                <div className={`row-wrapper row-wrapper-gallery`}>
                    <div className={`row row-gallery`}>
                        {items.map((item, index) => 
                            <LazyLoadImage className='row-gallery-image' key={index} src={`${item}`} alt=""/>
                        )}
                    </div>
                </div>
            )

        default:
            break;
    }
}

Row.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.oneOfType([
            // For "service" case
            PropTypes.shape({
                text: PropTypes.string.isRequired,
                link: PropTypes.string,
                imageSrc: PropTypes.string.isRequired,
                tags: PropTypes.arrayOf(PropTypes.string).isRequired 
            }),

            // For "news-cards" case
            PropTypes.shape({
                title : PropTypes.string.isRequired,
                date : PropTypes.string.isRequired,
                label : PropTypes.string.isRequired,
                imageSrc : PropTypes.string.isRequired,
            }),

            // For "members" case
            PropTypes.shape({
                fullName: PropTypes.string.isRequired,
                job: PropTypes.string.isRequired,
                imageSrc: PropTypes.string.isRequired,
                socialMedia: PropTypes.arrayOf(PropTypes.string)
            }),

            // For "gallery" case
            PropTypes.string // Assuming each item is a URL for LazyLoadImage
        ])
    ),
    nameOfItem: PropTypes.string,
    height: PropTypes.string
};
export default Row