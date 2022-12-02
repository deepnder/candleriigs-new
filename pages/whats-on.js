import Header from './Header';
import { useState, useEffect } from "react";
import { AiFillCalendar } from "react-icons/ai";
import { AiFillClockCircle } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";
import styles from "../styles/WhatsOn.module.css";
import { MdPerson } from "react-icons/md";
import { ImTicket } from "react-icons/im";
import We_Were_Here from "../Images/We_Were_Here.png";
import header_top_img from "../Images/header_top_img.png";
import Image from 'next/image';
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import dayjs from 'dayjs';
import Link from 'next/link';

export default function WhatsOn(props) {
    const [item, setItem] = useState(props.posts.eventData);
     const [data, setData] = useState([]);
     const [search,setSearch] = useState("");
 
    const allevents = () => {
       setData(props.posts.eventData)
     };
     const Navbar = dynamic(() => import("./NavBar"), {
      ssr: false
    });
    const Footer = dynamic(() => import("./Footer"), {
      ssr: false
    });

  return (
 <>
 <Suspense fallback={<div className="loading-lazy">loading....</div>}>

<Navbar search={search} setSearch={setSearch}/>
</Suspense>
 <Header/>

      <div className="exceedContainer">
        <div className={styles.HeaderItems}>
          <div className={styles.whatsOn}>
          {item
            .filter((userss) => {
              if (search == "") {
                return userss;
              } else if (
                userss.eventName.toLowerCase().includes(search.toLowerCase())
              ) {
                return userss;
              }
            })
            .slice(0, 9)
            .map((userss, i) => {
              return (
                <div className={styles.header_main} key={i}>
                  <div className={styles.header_img}>
                    <Link href={`/event/${userss.eventName.replaceAll(" ","-").toLowerCase()}`}>
                    <Image   width={300}   height={300}  
                      src={userss.uploadMainImage}
                      className={styles.imgheader}
                      alt=""
                    /></Link>
                  </div>

                  <div className={styles.header_container}>
                    <div className={styles.heading_item_top}>
                      <h1>{userss.eventName.slice(0, 140)}</h1>
                      <p className={styles.para_main}><Link style={{textDecoration:"none",color:"white"}} href={`/event/${userss.eventName.replaceAll(" ", "-").toLowerCase()}`}>{userss.title.slice(0, 80)}</Link></p>
                      <p className={styles.para_Child}>
                        {userss.subTitle.slice(0, 160)}
                      </p>
                    </div>
                    <div className={styles.header_item_bottom}>
                      <span className={styles.headerDateSpan}>
                        <AiFillCalendar
                          className={styles.react_icon}
                          style={{ marginRight: "3px" }}
                        />
                        {dayjs(userss.date.slice(0, 10)).format("MMM D YYYY")}
                        {/* <AiFillCalendar className="react_icon"  style={{'marginRight':'3px'}}/> {moment(userss.date.slice(0,10)).format("MMM Do YYYY")} */}
                      </span>

                      <span
                        className={styles.headerTimeSpan}
                        style={{ fontFamily: "Roboto" }}
                      >
                        <AiFillClockCircle className={styles.react_icon} />
                        &nbsp; Show&nbsp;
                        {userss.showStartTime}
                        {/* {userss.showStartZone}  */}
                        &nbsp;| Doors&nbsp;
                        {userss.doorOpeningTime}
                      </span>

                      {userss.price != 0 ? (
                        <span className={styles.headerTicketSpan}>
                          <GiTicket className={styles.react_icon} /> Tickets &#163;
                          {userss.price}
                        </span>
                      ) : (
                        <span className={styles.headerTicketSpan}>
                          {" "}
                          <ImTicket
                            style={{
                              position: "relative",
                              bottom: "2px",
                              width: "14px",
                              height: "14px",
                              right: "2px",
                            }}
                          />{" "}
                          Free Event
                        </span>
                      )}
                     {userss.eventType === "Live" ?  <a href={userss.eventLink}>
                        <button  className={`${styles["btn-hover"]}`}>Book Tickets </button>
                      </a> : userss.eventType === "Private Booking" ?  <a href={""}>
                        <button  className="" style={{background:"#FFFFFF" ,color:"#000000",cursor:"not-allowed"}}>Private Booking </button>
                      </a> : userss.eventType === "Cancelled" ?  <a href={""}>
                        <button  className="" style={{background:"#FFFFFF" ,color:"#000000",cursor:"not-allowed"}}>Cancelled </button>
                      </a> : userss.eventType === "Sold Out" ?  <a href={""}>
                        <button  className="" style={{background:"#D01010" ,color:"#FFFFFF" ,cursor:"not-allowed"}}>Sold Out </button>
                      </a> : null }
                    </div>
                    {userss.selectAge == "18+" ||
                    userss.selectAge == "All Ages" ? (
                      <p className={styles.HeaderCardTextAge}>
                        <MdPerson style={{ marginTop: "-3px" }} />
                        &nbsp;Age:&nbsp;{userss.selectAge}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            }) }
          {data
            .filter((userss) => {
              if (search == "") {
                return userss;
              } else if (
                userss.eventName.toLowerCase().includes(search.toLowerCase())
              ) {
                return userss;
              }
            })
            .slice(9, 50)
            .map((userss, i) => {
              return (
                <div className={styles.header_main} key={i}>
                  
                  <div className={styles.header_img}>
                    <Link href={`/event/${userss.eventName.replaceAll(" ","-").toLowerCase()}`}>
                    <Image   width={300}   height={300}  
                      src={userss.uploadMainImage}
                      className={styles.imgheader}
                      alt=""
                    /></Link>
                  </div>

                  <div className={styles.header_container}>
                    <div className={styles.heading_item_top}>
                      <h1>{userss.eventName.slice(0, 140)}</h1>
                      <p className={styles.para_main}><Link style={{textDecoration:"none",color:"white"}} href={`/event/${userss.eventName.replaceAll(" ", "-").toLowerCase()}`}>{userss.title.slice(0, 80)}</Link></p>
                      <p className={styles.para_Child}>
                        {userss.subTitle.slice(0, 160)}
                      </p>
                    </div>
                    <div className={styles.header_item_bottom}>
                      <span className={styles.headerDateSpan}>
                        <AiFillCalendar
                          className={styles.react_icon}
                          style={{ marginRight: "3px" }}
                        />{" "}
                        {dayjs(userss.date.slice(0, 10)).format("MMM D YYYY")}
                      </span>

                      <span className={styles.headerTimeSpan}>
                        <AiFillClockCircle className={styles.react_icon} />
                        Show {userss.showStartTime}| Doors{" "}
                        {userss.doorOpeningTime}
                      </span>
                      {userss.price != 0 ? (
                        <span className={styles.headerTicketSpan}>
                          <GiTicket className={styles.react_icon} /> Tickets &#163;
                          {userss.price}
                        </span>
                      ) : (
                        <span className={styles.headerTicketSpan}>
                          {" "}
                          <ImTicket
                            style={{
                              position: "relative",
                              bottom: "2px",
                              width: "14px",
                              height: "14px",
                              right: "2px",
                            }}
                          />{" "}
                          Free Event
                        </span>
                      )}
                      {userss.eventType === "Live" ?  <a href={userss.eventLink}>
                        <button  className={`${styles["btn-hover"]}`}>Book Tickets </button>
                      </a> : userss.eventType === "Private Booking" ?  <a href={""}>
                        <button  className="" style={{background:"#FFFFFF" ,color:"#000000",cursor:"not-allowed"}}>Private Booking </button>
                      </a> : userss.eventType === "Cancelled" ?  <a href={""}>
                        <button  className="" style={{background:"#FFFFFF" ,color:"#000000",cursor:"not-allowed"}}>Cancelled </button>
                      </a> : userss.eventType === "Sold Out" ?  <a href={""}>
                        <button  className="" style={{background:"#D01010" ,color:"#FFFFFF" ,cursor:"not-allowed"}}>Sold Out </button>
                      </a> : null }
                    </div>
                    {userss.selectAge == "18+" ||
                    userss.selectAge == "All Ages" ? (
                      <p className={styles.HeaderCardTextAge}>
                        <MdPerson style={{ marginTop: "-3px" }} />
                        &nbsp;Age:&nbsp;{userss.selectAge}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          <button className=
          {styles.bottom_home_btn1} onClick={allevents}>
            {" "}
            More Events{" "}
          </button>
          <div className={`${styles["header_item_img"]} ${styles["container"]}`}>
            <div className={styles.we_are_here}>
              <Image src={header_top_img} className={styles.header_top_img} alt="" />
              <Image src={We_Were_Here} className={styles.we_Were_Here} alt="" />
            </div>
            <div className={styles.header_item_h1}>
              <p>
                MTV ~ Janey Godley ~ Clean Bandit ~ Ramond Mearns ~ Nicholas
                Macdonald ~ Dmitri From Paris ~ Alabama3 ~ Des McLean ~ Dragart
                ~ Karen Dunbar ~ Isaac Butterfield ~ Paul Riley ~ Ashley Storrie
                ~ Groove Theory ~ Soul Nation ~ Gary Little ~ Ro Campbell ~ Adam
                Vincent Rowe ~ Keith Carter ~ Stuart Mitchell ~ Motown Brothers
                ~ Christina Bianco ~ Jollyboat ~ Chris Henry
              </p>
            </div>
           
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Footer/>
      </Suspense>
 </>
  )
}
export async function  getStaticProps() {
const res = await fetch("https://candleriggs-staging-73rkv.ondigitalocean.app/api/getActiveEvents")
const posts = await res.json();
return {
  props:{
    posts
  }
}
}
