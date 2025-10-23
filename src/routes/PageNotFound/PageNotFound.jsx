import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./PageNotFound.css"
import magnifier from "/images/magnifier.png"
import { useModalBoxesContext } from "../../components/useModalBoxesContext"
import Button from "../../components/Button"

function PageNotFound() {

    const {handleClickAlert} = useModalBoxesContext()

  return (
    <>
        <Header textColor='black'/>
        {/* <Page contentComponents={content}  */}
        <main style={{paddingLeft:'80px', paddingRight:'80px', paddingTop:'88px', backgroundColor:'white'}} id="main-page-not-found">      
            <section id='page-not-found-box'>
                <div id="page-not-found-heading">
                    <img src={magnifier} alt="magnifier"/>
                    <div id='page-not-found-text-wrapper'>
                        <h1 id="page-not-found-title">Page not found</h1>
                        <p id="page-not-found-paragraph">
                            Return to homepage or send a message to let usknow about a link that doesn’t work properly
                        </p>
                    </div>

                    <div id="page-not-found-action">
                        <Button text="send message" arrowTilt="right" type="button" handleClick={handleClickAlert}/>
                        <Button text="go homepage" arrowPosition="none" color="non-default" type="button" link="/"/>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
    </>
  )
}

export default PageNotFound