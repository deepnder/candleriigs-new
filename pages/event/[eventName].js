import { useState, useEffect } from 'react';
import { ImTicket } from "react-icons/im";
import { AiFillClockCircle, AiFillCalendar } from "react-icons/ai";
import { MdPerson } from "react-icons/md";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import {useRouter} from "next/router";
import styles from "../../styles/EventPage.module.css";
import Image from 'next/image';
import dayjs from 'dayjs';

export default function EventPage(posts) {
 

  const [data, setData] = useState([]);
  const router = useRouter();
  const eventName = router.query.eventName;
  const fetchData = async () => {
    const response = await fetch(
        `https://candleriggs-staging-73rkv.ondigitalocean.app/api/findEventByName/${eventName}`
    );
    const resp = await response.json();
    setData(resp.msg);
    console.log(resp);
    
  };
useEffect(()=>{
  fetchData();
},[])
//   useEffect(() => {
// setData(posts.msg)
//   }, []);

  console.log(data);
  const Navbar = dynamic(() => import("../NavBar"), {
    ssr: false
  });
  const Footer = dynamic(() => import("../Footer"), {
    ssr: false
  });
  return (
    <>
  <Suspense fallback={<div className="loading-lazy">loading....</div>}>

<Navbar />
</Suspense>
     <div className="exceedContainers">
        <div className={styles.event_page}>
          <Image width={300} height={300}
            src={data.uploadMainImage}
            className={styles.event_page_img}
            alt="..."
          />
          <div className= {`${styles["card-body1"]}`}>
            <h5 className={`${styles["card-title1"]}`}>{data.eventName}</h5>
            <p className={`${styles["card-text1"]}`}>{data.title}</p>
            <p className={`${styles["card-text2"]}`}>{data.subTitle}</p>
            <div className={styles.event_page_row}>
              <p className="card-text card_gap">
                <AiFillCalendar style={{ marginTop: "-5px" }} />
                {dayjs(data.date).format("MMM D YYYY")}
              </p>
              <p
                className={`${styles["card_gap"]} ${styles[" card_gap1"]} ${styles["text-2-b"]} ${styles["card-text"]} `}
                style={{ fontFamily: "Roboto" }}
              >
                <AiFillClockCircle
                  style={{ marginTop: "-3px" }}
                />{" "}
                Show {data.showStartTime}
                {""} | Doors {data.doorOpeningTime}
              </p>

              {data.price != 0 ? (
                <p className={`${styles["card_gap"]} ${styles["card-text"]}`}>
                 {""}
                  <ImTicket style={{ marginTop: "-5px" }} /> Ticket &#163;
                  {data.price}
                </p>
              ) : (
                <p className= {`${styles["card_gap"]} ${styles["card-text"]}`}>
                  {""}
                  <ImTicket style={{ marginTop: "-5px" }} />
                  Free Event
                </p>
              )}
              {data.selectAge == "18+" || data.selectAge =="All Ages" ? (
                <p className={styles.CardTextAge1}>
                  <MdPerson style={{ marginTop: "-3px" }} />
                  &nbsp;Age:&nbsp;{data.selectAge}
                </p>
              ) : (
                <></>
              )}
            </div>
            {data.eventType === "Live" ?  <a href={data.eventLink} >
            <button className={styles.event_page_btn2}>
            Book Tickets
              </button> 
            </a>  :  data.eventType === "Private Booking" ?  <a href={""} ><button className={styles.event_page_btn2} style={{background:"#FFFFFF" ,color:"#000000",cursor:"not-allowed"}}>
        Private Booking
              </button></a> : data.eventType === "Sold Out" ?  <a href={""} ><button className={styles.event_page_btn2} style={{background:"#D01010" ,color:"#FFFFFF" ,cursor:"not-allowed"}}>
      Sold Out
              </button></a> : data.eventType === "Cancelled" ? <a href={""} ><button className={styles.event_page_btn2} style={{background:"#FFFFFF" ,color:"#000000",cursor:"not-allowed"}}>
        Cancelled
              </button></a>  : null   }
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Footer/>
      </Suspense>
    </>
  )
}


// export async function  getStaticProps() {
//   const res = await fetch("")
//   const posts = await res.json(`https://candleriggs-staging-73rkv.ondigitalocean.app/api/findEventByName/${eventName}`);
//   console.log(posts)
//   return {
//     props:{
//       posts
//     }
//   }
//   }