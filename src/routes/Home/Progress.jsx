import "./Progress.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTranslation } from '../../contexts/TranslationContext';

import analysisIcon  from"/images/icon-analysis.svg"
import productLaunchIcon  from"/images/icon-product-launch.svg"
import productIcon from"/images/icon-product-home.svg"
import researchIcon from"/images/icon-research.svg"
import solutionIcon from"/images/icon-solution.svg"
import testingIcon  from"/images/icon-testing.svg"

function Progress() {
    const { t } = useTranslation();
    
    const card_info = [
        {
            title: t('home.progress.step1.title', 'Analysis, Discussion & Offer'),
            description: t('home.progress.step1.description', 'We analyse your objectives and expectations going through all the requirements. Then we have an estimation of the price & time for product development.'),
            icon_src: analysisIcon,
        },
        {
            title: t('home.progress.step2.title', 'Research & Wireframing'),
            description: t('home.progress.step2.description', "We set up a wireframe to establish the architecture of the product. This will give everyone the insight on the 'big picture' of your risks and opportunities."),
            icon_src: researchIcon,
        },
        {
            title: t('home.progress.step3.title', 'Product Design'),
            description: t('home.progress.step3.description', "Our design team create high-quality prototype of your solution based on the wireframes and going through all the screens and elements. Here we have an iterative process where we design a target blueprint of how your product should look like. We create engaging, user-friendly and stunning designs that will seamlessly communicate with end-users and make you stand out among your competitors."),
            icon_src: productIcon,
        },
        {
            title: t('home.progress.step4.title', 'Solution Development'),
            description: t('home.progress.step4.description', "Our team of developers build your product using modern coding standards and proven technologies to ensure that it is quickly, secure and scalable."),
            icon_src: solutionIcon,
        },
        {
            title: t('home.progress.step5.title', 'Testing & Quality Assurance'),
            description: t('home.progress.step5.description', "The product goes through several testing phases to ensure that there are no bugs or lags and the product itself provides a good user experience. At this stage we prepare you with the documentation on how to manage and update the product. By leveraging a dedicated pool of professional QA engineers, we manage all aspects of testing to meet your objectives, improve quality, and increase release velocity."),
            icon_src: testingIcon,
        },
        {
            title: t('home.progress.step6.title', 'Product Launch'),
            description: t('home.progress.step6.description', "This is not the end of our commitment. We provide technical support for a period of time so you will not be on your own once the work is completed."),
            icon_src: productLaunchIcon,
        },
    ]

    return (
        <section className='progress'>
            <div className='content'>
                <div className='heading'>
                    <h3 className='font-title m-0'>{t('home.progress.title', 'How it works')}</h3>
                    <p id="intro">
                        {t('home.progress.intro', 'Our processes are transparent so you will know what we are working on, and why')}
                    </p>
                </div>

                <div className='grid-card'>
                    {card_info.map((item, index) => {
                        return (
                            <div className='card' key={item.title} id={"card" + (index + 1) }>
                                <LazyLoadImage effect="blur" className='icon-card' src={item.icon_src}/>
                                <div className='card-content'>
                                    <h4 className="m-0">
                                        {item.title}
                                    </h4>
                                    <p className="m-0">
                                        {item.description}
                                    </p>
                                </div>
                                <div className='count-progress'>
                                        {`0${index + 1}`}
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
    )
}

export default Progress
