import styles from "../styles/Venue.module.css";
import FirstEventI from "../Images/FirstEventI.png";
import SecondEventI from "../Images/SecondEventI.png";
import ImageCornerNew3 from "../Images/ImageCornerNew3.png";
import ImageCornerNew4 from "../Images/ImageCornerNew4.png";
import FirstCollec from "../Images/FirstCollec.png";
import SecondCollec from "../Images/SecondCollec.png";
import ThirdCollec from "../Images/ThirdCollec.png";
import FourthCollec from "../Images/FourthCollec.png";
import FifthCollec from "../Images/FifthCollec.png";
import MainCarousel from "./mainCarasoul";
import Image from "next/image"
import WhatsAppPop from "./WhatsAppPop";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
// import Navbarss from "./Navbarss";

export default function Venue() {
  const Navbar = dynamic(() => import("./NavBar"), {
    ssr: false
  });
  const Footer = dynamic(() => import("./Footer"), {
    ssr: false
  });

  return (
    <>
     <Suspense fallback={<div className="loading-lazy">loading....</div>}>

<Navbar />
</Suspense>
      <div className={styles.venuesStarting}>
        <div
          className= {styles.main_top_venue_head}
          style={{
            textAlign: "center",
            alignItems: "center",
            display: "contents",
            fontFamily: "Rochester",
          }}
        >
          <h5 className={styles.cardevent1}>At 18 Candleriggs we make it happen.</h5>
        </div>
        <div
          className=  {`${styles["event_rowStart"]} ${styles["event_main_section"]} ${styles["row"]} ${styles["row-cols-md-2"]} ${styles["container"]} ${styles["row-cols-1"]} ${styles["g-4"]}`}
          style={{ marginTop: "1rem" }}
        >
          <div className= {`${styles["event_Col1"]} ${styles["col"]} ${styles["container"]}`}>
            <Image src={FirstEventI} className="card-img-top" alt="..." />
            <div className={`${styles["card-body"]} ${styles["card-items"]} ${styles["card_heading"]}`} >
              <h5
                className= {`${styles["card-title"]} ${styles["sideImageheading"]} ${styles["venue_heading"]} ${styles["cardEight"]}`}
                style={{
                  marginTop: "75px",
                  width: "491px",
                  marginLeft: "35px",
                }}
              ></h5>
            </div>
          </div>
          
          <div className= {`${styles["event_Col2"]} ${styles["col"]} ${styles["container"]}`}>
            <div className={`${styles["card-body"]} ${styles["card-position"]} ${styles["card_heading"]}`}>
              <h5 className={`${styles["cardEvent"]} ${styles["card-title"]}`}>
                Events are the name of the game{" "}
              </h5>
            </div>
            <Image src={SecondEventI} className="card-img-top" alt="..." />
          </div>
        </div>

        <div className={styles.Book_Venue_container }>
          <h3>Book Venue</h3>
          <div className="Book_carasouel container">
         <MainCarousel/>
          </div>
          <div className={styles.Book_Venue_description}>
            {/* <p>
              In the heart of Glasgow is one of the oldest and most stylish
              districts “The Merchant City” 18 Candleriggs is a purpose built
              thriving event space, set with its own stage and awesome sound,
              the perfect location to host your next premium event holding up to
              200 people with late license, with great food and delicious
              cocktails.
            </p>

            <section>
              Venue booking enquiries are simple, click the whatsapp icon and
              speak directly to a manager, let us check the date and see if we
              can make your event a night to remember.
            </section>
            <p style={{marginTop:"3rem"}}>
              18 Candleriggs has catered to Live Bands, DJs, Comedians and even
              an award night for MTV.
            </p>
            <p style={{marginTop:"2rem"}}> At 18 Candleriggs we make it happen, let’s chat.</p> */}
          </div>
          {/* <div className="Book_button" style={{visibility:"hidden"}}>
            <a href="/"> Book Venue</a>
          </div> */}
        </div>
      </div>
      <div className={styles.sectionParaAndImages}>
        <section className={styles.section_main_container}>
          <div className={styles.section_main_left}>
            <span className={styles.span_image}>
              <Image src={ImageCornerNew3} alt="" />
            </span>
            <div className={styles.top_image}>
              <Image src={FirstCollec} alt="" />
              <Image src={SecondCollec} alt="" />
            </div>
            <div className={styles.horizontal_image}>
              <Image src={ThirdCollec} alt="" />
              <Image src={FourthCollec} alt="" />
            </div>
            <div className={styles.main_horizontal_img}>
              <Image src={FifthCollec} alt="" />
            </div>
            <Image src={ImageCornerNew4} className={styles.corner_left} alt="" />
          </div>
        </section>
        <div className={`${styles["right_section"]} ${styles["rigthSectionDesktopView"]}`}>
          <div className={styles.para_section}>
            <p>
              A one-stop cabaret lounge in the heart of Merchant City, 18
              Candleriggs (formerly known as Wild Cabaret) knows no bounds when
              it comes to unique dabbles, daring nights and dashing shows.
            </p>
            <p>
              Echoing its eccentric entertainment, the decor is markedly Art
              Deco. Gilded in gold, with a bar boasting its name up in
              Hollywood-style lights, these two spaces epitomize showbiz and
              glistening sass. Sashay down to a table of baroque seats and let
              the show commence.
            </p>
            <p>
              Events are the name of the game at 18 Candleriggs, where live
              music and cabaret reign supreme. From burlesque shows and circus
              troupes to comedy nights and luxe shows, it&apos;s at the top of its
              game when it comes to providing guests with a wholly unique
              drinking and dining experience in the city. Top hats? Sparkles?
              And feather boas? These all come as standard.
            </p>
          </div>
        </div>
        <div className={`${styles["right_section"]} ${styles["rigthSectionMobileView"]}`}>
          <div className= {`${styles["para_section"]} ${styles["paraSectionMobileView"]}`}>
            <p className={styles.paraSectionP} style={{color:"#000000"}}>
              Events are the name of the game at 18 Candleriggs, where live
              music and cabaret reign supreme. From burlesque shows and circus
              troupes to comedy nights and luxe shows, it&apos;s at the top of its
              game when it comes to providing guests with a wholly unique
              drinking and dining experience in the city. Top hats? Sparkles?
              And feather boas? These all come as standard.
            </p>
            <p style={{color:"#000000",fontWeight:"bold",fontSize:"13px"}}>18 Candleriggs the perfect venue to host your next event.</p>
          </div>
        </div>
      </div>

      <div className="whatsapp" style={{ position: "relative" }}>
        <WhatsAppPop />
        
      </div>
      

      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Footer/>
      </Suspense>
    </>
  );
}
