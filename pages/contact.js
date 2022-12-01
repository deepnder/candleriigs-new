import { IoIosMail } from "react-icons/io";
import { CgPhone } from "react-icons/cg";
import { HiLocationMarker } from "react-icons/hi";
// import WhatsAppWidget from "react-whatsapp-chat-widget";
import WhatsAppPop from "./WhatsAppPop";
// import Navbar from './Navbar';
import styles from "../styles/Contact.module.css";
// import Footer from './Footer';
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

export default function Contact() {
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

      <div className={`${styles["contact-us"]}`}>
        <h1 className={`${styles["contact-us--heading"]}`}>Get In Touch</h1>
        <p className={`${styles["contact-us-para"]}`}>
          We are always available to answer your questions, if its to book the
          venue or to find out of there any tickets left for one of our events.
        </p>
      </div>
      <div className={`${styles["contact-us--left"]}`}>
        <a
          href="tel:+443302021818"
          style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          className={`${styles["class_contact"]}`}
        >
          <span style={{ fontSize: "25px" }}>
            <CgPhone
              style={{ height: "30px", width: "30px", marginBottom: "15px" }}
            />
          </span>
          0330 202 1818
        </a>
        <a
          href="mailto:events@18candleriggs.com"
          style={{ textDecoration: "none", color: "black", fontWeight: "bold" }}
          className={`${styles["class_contact"]}`}
        >
          <span style={{ fontSize: "25px" }}>
            <IoIosMail
              style={{ height: "30px", width: "30px", marginBottom: "15px" }}
            />
          </span>
          events@18candleriggs.com
        </a>
      </div>
      <div className={`${styles["contact-us--right"]}`}>
        <div className={styles.div_top}>
          {/* 
            <HiLocationMarker className="map_logo" style={{height:"40px",width:'40px'}} />  */}
        </div>
        <p className={styles.contact_map}>
          <HiLocationMarker
            className={styles.map_logo}
            style={{ height: "40px", width: "40px", marginTop: "-6px" }}
          />{" "}
          18 Candleriggs, Glasgow G1 1LD, UK
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2239.2931340187865!2d-4.2481246840653855!3d55.8575803805815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488846a15d711dd1%3A0xfb23344156361e71!2s18%20Candleriggs%2C%20Glasgow%20G1%201LD%2C%20UK!5e0!3m2!1sen!2sin!4v1665748803540!5m2!1sen!2sin"
          width="800"
          height="450"
          className={styles.map_location}
          style={{ border: "0", marginTop: "15px" }}
          allowFullScreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <WhatsAppPop/>
      {/* <p className="ws--p">Chat with me</p> */}
      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Footer/>
      </Suspense>
    </>
  );
};
