import Row from '../../components/Row'
import "./Team.css"

import nicolaeImage from "/images/nicolae.png"
import alexandruImage from "/images/alexandru.png"
import elenaImage from "/images/elena.png"
import cameliaImage from "/images/camelia.png"

function Team() {
    const rowContent = [
        {
          fullName: "Alexandru Iaroslavschi",
          job: "CEO & Founder",
          imageSrc: alexandruImage,
          socialMedia: [""]
        },
        {
          fullName: "Elena Roșca",
          job: "Co-Founder",
          imageSrc: elenaImage,
          socialMedia: [""]
        },
        {
          fullName: "Camelia Brashovsky",
          job: "Social Media Manager",
          imageSrc: cameliaImage,
          socialMedia: [""]
        },
        {
          fullName: "Nicolae Erhan",
          job: "Graphic Designer",
          imageSrc: nicolaeImage,
          socialMedia: [""]
        },
    ]
  return (
    <section className='d-flex flex-column justify-content-center align-items-center team-section'>
        <h2 className='team-title m-0'>Meet the team</h2>
        <Row items={rowContent} nameOfItem="members"/>
    </section>
  )
}

export default Team