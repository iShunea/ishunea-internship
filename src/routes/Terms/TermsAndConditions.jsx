import "./TermsAndConditions.css"

function TermsAndConditions() {
    const textTerms = {
        title: "Terms & Conditions",
        intro: "For athletes, high altitude produces two contradictory effects on performance. For explosive events the reduction in atmospheric pressure means there is less resistance from the atmosphere and the athlete's performance will generally be better at high altitude.",
        firstSubheading: "How to build a loyal community online",
        firstParagraph : `Physiological respiration involves the mechanisms that ensure that the composition of the functional residual capacity is kept constant, and equilibrates with the gases dissolved in the pulmonary capillary blood, and thus throughout the body. Thus, in precise usage, the words breathing and ventilation are hyponyms, not synonyms, of respiration; but this prescription is not consistently followed, even by most health care providers, because the term respiratory rate (RR) is a well-established term in health care, even though it would need to be consistently replaced with ventilation rate if the precise usage were to be followed.\r\n
        The long barrow was built on land previously inhabited in the Mesolithic period. It consisted of a sub-rectangular earthen tumulus, estimated to have been 15 metres (50 feet) in length, with a chamber built from sarsen megaliths on its eastern end. Both inhumed and cremated human remains were placed within this chamber during the Neolithic period, representing at least nine or ten individuals.\r\n
        Physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time, to be part of a boundless four-dimensional continuum known as spacetime. The concept of space is considered to be of fundamental importance to an understanding of the physical universe. However, disagreement continues between philosophers over whether it is itself an entity, a relationship between entities, or part of a conceptual framework.\r\n
        In the eighteenth century the German philosopher Immanuel Kant developed a theory of knowledge in which knowledge about space can be both a priori and synthetic. According to Kant, knowledge about space is synthetic, in that statements about space are not simply true by virtue of the meaning of the words in the statement. In his work, Kant rejected the view that space must be either a substance or relation. Instead he came to the conclusion that space and time are not discovered by humans to be objective features of the world, but imposed by us as part of a framework for organizing experience.`,
        secondSubheading: `Helping a local business reinvent itself`,
        secondParagraph : `Maxwell's equations – the foundation of classical electromagnetism – describe light as a wave that moves with a characteristic velocity. The modern view is that light needs no medium of transmission, but Maxwell and his contemporaries were convinced that light waves were propagated in a medium, analogous to sound propagating in air, and ripples propagating on the surface of a pond. This hypothetical medium was called the luminiferous aether, at rest relative to the "fixed stars" and through which the Earth moves. Fresnel's partial ether dragging hypothesis ruled out the measurement of first-order (v/c) effects, and although observations of second-order effects (v2/c2) were possible in principle, Maxwell thought they were too small to be detected with then-current technology.`
    }

  return (
    <main style={{backgroundColor:'white', paddingTop:'168px'}}>
        <section id="terms-content">
            <div id="terms-heading">
                <h1 className="m-0 font-title">{textTerms.title}</h1>
                <article id='terms-article'>
                    <p id="terms-intro" className="m-0">{textTerms.intro}</p>
                    <h3 className='terms-subheading m-0'>{textTerms.firstSubheading}</h3>
                    <p className='terms-main-text m-0'>{textTerms.firstParagraph}</p>

                    <h3 className='terms-subheading m-0'>{textTerms.secondSubheading}</h3>
                    <p className='terms-main-text m-0'>{textTerms.secondParagraph}</p>
                </article>
            </div>

        </section>
    </main>
  )
}

export default TermsAndConditions
// 0px, 24px, 64px, 24px