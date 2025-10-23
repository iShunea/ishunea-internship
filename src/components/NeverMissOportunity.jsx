import "../styles/NeverMissOportunity.css"
import clockImage from "/images/clock.png"
import Button from './Button'

function NeverMissOportunity() {
  return (
    <section className='width-100 d-flex justify-content-center align-content-center never-miss-padding-wrapper'>
      <div className='blue-box-container'>
        <div className='d-flex flex-column justify-content-center align-items-center never-miss-container-wrapper'>
          <img src={clockImage}/>
          <h4 className='m-0 font-title font-weight-500 m-0 text-center'>
            Never miss any article from us
          </h4>

          <form autoComplete='off' className='d-flex gap-16 never-miss-flex width-100'>
            <input placeholder='E-mail address' className='width-100'/>
            <Button text='subscribe' arrowTilt="right" nonDefaultSize={false} height="48px" type="button"/>
          </form>
        </div>
    </div>
    </section>
  )
}

export default NeverMissOportunity