import React, { Suspense } from "react";
import Link from 'next/link'
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { MdPerson } from "react-icons/md";
import { ImTicket } from "react-icons/im";
import { AiFillClockCircle, AiFillCalendar } from "react-icons/ai";
import dynamic from "next/dynamic";
import soldOut from "../Images/soldOut.png";
import soldOutMobile from "../Images/soldOutMobile.png";
import cancelled from "../Images/cancelled.png"
import camcelledMobile from "../Images/camcelledMobile.png";
import downloadArrows from "../Images/downloadArrows.png";


const Navbar = dynamic(() => import("./NavBar"), {
  ssr: false
});
const Footer = dynamic(() => import("./Footer"), {
  ssr: false
});
export default function index({posts}) {
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  // const [event, setEvent] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(()=>{
    setItem(posts.eventData)
  },[]);
  const allevents = () => {
    setItems(posts.eventData)
  };
  const fetchData = async () => {
    const response = await fetch(
      "https://candleriggs-staging-73rkv.ondigitalocean.app/api/activeBanner"
    );
    const data = await response.json();
    console.log(data.bannerData);
    setUser(data.bannerData);
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const mustEvent = async () => {
  //   const response = await fetch(
  //     "https://candleriggs-staging-73rkv.ondigitalocean.app/api/mustSee"
  //   );
  //   const data = await response.json();
  //   console.log(data.data);
  //   setEvent(data.data);
  // };

  // useEffect(() => {
  //   mustEvent();
  // }, []);

  return (
    <>
    <Suspense fallback={<div className="loading-lazy">loading....</div>}>

      <Navbar search={search} setSearch={setSearch}/>
    </Suspense>
      <div className={styles.exceedContainer} style={{ overflow: "hidden" }}>
        <div className={styles.containerFirst}>
          <div className={styles.f_cont}>
          {user.slice(0, 1).map((imagess, i) => (
              <>
                <span className={styles.soldOut}>
                  {imagess.eventType === "Sold Out" ? (
                    <Image 
                      src={soldOut}
                      className={styles.desktopBannerSold}
                    />
                  ) : imagess.eventType === "Cancelled" ? (
                    <Image 
                      src={cancelled}
                      className={styles.desktopBannerSold}
                    />
                  ) : null}
                </span>
                <div className={`${styles["fContImagesDesktop"]} ${styles["fContImages"]}`} key={i}>
                  <Image width={450} height={450}
                    src={imagess.addBannerImage}
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className={`${styles["desktopArrow"]} ${styles["downloadArrow"]}`}>
                  <Image width={450} height={450} src={downloadArrows} alt="" className={styles.downloadArrow1} />
                </div>
                <div className={`${styles["fContImages"]} ${styles["fContImagesMobile"]}`}>
                  <Image width={450} height={450}
                    src={imagess.addMobileBannerImage}
                    className={styles.addMobileBannerImageMobile}
                    alt=""
                  />
                </div>
                <div className={`${styles["MobileArrow"]} ${styles["downloadArrow"]}`}>
                  <Image src={downloadArrows} alt="" width={450} height={450} className={styles.downloadArrow2} />
                </div>
                <span className={styles.soldOutMobile}>
                  {imagess.eventType === "Sold Out" ? (
                    <Image 
                      src={soldOutMobile}
                      className={styles.soldOutMobileImage}
                    />
                  ) : imagess.eventType === "Cancelled" ? (
                    <Image
                      src={camcelledMobile}
                      className={styles.soldOutMobileImage}
                    />
                  ) : null}
                </span>
              </>
            ))}
            <div className={styles.container}>
              <div className={styles.wts_on}>
                <div
                  className={styles.Link}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p
                    className={styles.pWhat_on}
                    style={{
                      margin: "auto",
                      fontSize: "21px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    What's On At Glasgow's Coolest Event Space.
                  </p>
                  <p className={styles.pWhat_on2}>
                    What's On At Glasgow's Leading Event Space
                  </p>

                  <p
                    className={styles.wtsView}
                    style={{
                      marginTop: "15px",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  >
                    <a
                      style={{
                        textDecoration: "none",
                        color: "Black",
                        marginTop: "5px",
                      }}
                      href="/"
                    >
                      View All
                    </a>
                  </p>
                </div>

                <div className={styles.frontImageFlex}>
                  <div
                   className={styles.frontImageFlexItem}
                   
                  >
                    {item && item.length
                      ? item
                          .filter((data) => {
                            if (search == "") {
                              return data;
                            } else if (
                              data.eventName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return data;
                            }
                          })
                          .slice(0, 9)
                          .map((data, i) => (
                            <div
                              className={`${styles["col"]} ${styles["home_event"]} ${styles["homeEventCol "]} `}
                              key={i}
                              style={{marginBottom:"60px"}}
                            >
                              {/* <div className="card"> */}
                              {/* <Link
                                to={`/event/${data.eventName
                                  .replaceAll(" ", "-")
                                  .toLowerCase()}`}
                              >
                            </Link> */}
                             <Link href={`/event/${data.eventName
                                  .replaceAll(" ", "-")
                                  .toLowerCase()}`}>
                                  
                                  
                            <Image  src={data.uploadMainImage}
                                style={{ borderRadius: "50px 0px 0px 0px " }}
                                className={`${styles["card-img-top"]}`}
                                alt="..."  width={450} height={450}/>
                                  </Link>
                             
                              <div
                                className={`${styles["card-body"]} ${styles["cardbodyh5"]} ${styles["background-color-home"]} `}
                                style={{
                                  background: "#270F33",
                                  fontFamily: "Roboto",
                                  position:"relative",
                                  bottom:"4px"
                              
                                }}
                              >
                                <h5 className={styles.card_title}>
                                  {data.eventName.slice(0, 50)}
                                </h5>
                                <p
                                  className={`${styles["card-text"]} ${styles["cardTitle"]} `}
                                >
                                  {data.title.slice(0, 80)}
                                </p>
                                <p
                                  className={`${styles["card-text"]} ${styles["text-1"]} `}
                                >
                                  {data.subTitle.slice(0, 160)}
                                </p>
                                {data.price != 0 ? (
                                  <p
                                    className={`${styles["card-text"]} ${styles["text-2"]} `}
                                  >
                                  <ImTicket
                                     
                                     className="ticketIcon"
                                   />
                                    Tickets &#163;{data.price}
                                  </p>
                                ) : (
                                  <p
                                    className={`${styles["card-text"]} ${styles["text-2"]} `}
                                  >
                                    <ImTicket
                                   
                                   className="ticketIcon"
                                 />
                                    {" "}
                                   {" "}
                                    Free Event
                                  </p>
                                )}
                                <p
                                  className={`${styles["card-text"]} ${styles["text-2-a"]} `}
                                  
                                >
                                  {/* {data.showStartMinute ===0 ? data.showStartHour :} */}
                                  <AiFillClockCircle
                                    
                                    className="timeIcon"
                                  />
                                  {" "}
                                  Show {data.showStartTime.toLowerCase()}
                                  {""} | Doors {data.doorOpeningTime.toLowerCase()}
                                </p>
                                <p
                                  className={`${styles["card-text"]} ${styles["date"]} `}
                                >
                                   <AiFillCalendar
                                    style={{ marginTop: "-3px" }}
                                  />
                              
                                  {dayjs(data.date).format(
                                    "MMM D YYYY"
                                  )}
                                </p>
                                {data.selectAge === "18+" ||
                                data.selectAge === "All Ages" ? (
                                  <p
                                    className={`${styles["card-text"]} ${styles["CardTextAge"]} `}
                                  >
                                   <MdPerson style={{ marginTop: "-6px" }} />
                                    &nbsp;Age:&nbsp;{data.selectAge}
                                  </p>
                                ) : null}

                                <a
                                  href={data.eventLink}
                                  className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["button"]} `}
                                >
                                  Book Tickets
                                </a>
                              </div>
                            </div>
                          ))
                      : null}
                    
                  </div>
                </div>

               
                <div className={styles.frontImageFlex}>
                  <div
                   className={styles.frontImageFlexItem}
                   
                  >
                    {items && items.length
                      ? items
                          .filter((datas) => {
                            if (search == "") {
                              return datas;
                            } else if (
                              datas.eventName
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return datas;
                            }
                          })
                          .slice(0, 9)
                          .map((datas, i) => (
                            <div
                              className={`${styles["col"]} ${styles["home_event"]} ${styles["homeEventCol "]} `}
                              key={i}
                              style={{marginBottom:"60px"}}
                            >
                              {/* <div className="card"> */}
                              {/* <Link
                                to={`/event/${data.eventName
                                  .replaceAll(" ", "-")
                                  .toLowerCase()}`}
                              >
                            </Link> */}
                             <Link href={`/event/${datas.eventName
                                  .replaceAll(" ", "-")
                                  .toLowerCase()}`}>
                                  
                                  
                            <Image  src={datas.uploadMainImage}
                                style={{ borderRadius: "50px 0px 0px 0px " }}
                                className={`${styles["card-img-top"]}`}
                                alt="..."  width={450} height={450}/>
                                  </Link>
                             
                              <div
                                className={`${styles["card-body"]} ${styles["cardbodyh5"]} ${styles["background-color-home"]} `}
                                style={{
                                  background: "#270F33",
                                  fontFamily: "Roboto",
                                  position:"relative",
                                  bottom:"4px"
                              
                                }}
                              >
                                <h5 className={styles.card_title}>
                                  {datas.eventName.slice(0, 50)}
                                </h5>
                                <p
                                  className={`${styles["card-text"]} ${styles["cardTitle"]} `}
                                >
                                  {datas.title.slice(0, 80)}
                                </p>
                                <p
                                  className={`${styles["card-text"]} ${styles["text-1"]} `}
                                >
                                  {datas.subTitle.slice(0, 160)}
                                </p>
                                {datas.price != 0 ? (
                                  <p
                                    className={`${styles["card-text"]} ${styles["text-2"]} `}
                                  >
                                  <ImTicket
                                     
                                     className="ticketIcon"
                                   />
                                    Tickets &#163;{datas.price}
                                  </p>
                                ) : (
                                  <p
                                    className={`${styles["card-text"]} ${styles["text-2"]} `}
                                  >
                                    <ImTicket
                                   
                                   className="ticketIcon"
                                 />
                                    {" "}
                                   {" "}
                                    Free Event
                                  </p>
                                )}
                                <p
                                  className={`${styles["card-text"]} ${styles["text-2-a"]} `}
                                  
                                >
                                  {/* {data.showStartMinute ===0 ? data.showStartHour :} */}
                                  <AiFillClockCircle
                                    
                                    className="timeIcon"
                                  />
                                  {" "}
                                  Show {datas.showStartTime.toLowerCase()}
                                  {""} | Doors {datas.doorOpeningTime.toLowerCase()}
                                </p>
                                <p
                                  className={`${styles["card-text"]} ${styles["date"]} `}
                                >
                                   <AiFillCalendar
                                    style={{ marginTop: "-3px" }}
                                  />
                              
                                  {dayjs(datas.date).format(
                                    "MMM D YYYY"
                                  )}
                                </p>
                                {datas.selectAge === "18+" ||
                                datas.selectAge === "All Ages" ? (
                                  <p
                                    className={`${styles["card-text"]} ${styles["CardTextAge"]} `}
                                  >
                                   <MdPerson style={{ marginTop: "-6px" }} />
                                    &nbsp;Age:&nbsp;{datas.selectAge}
                                  </p>
                                ) : null}

                                <a
                                  href={datas.eventLink}
                                  className={`${styles["btn"]} ${styles["btn-primary"]} ${styles["button"]} `}
                                >
                                  Book Tickets
                                </a>
                              </div>
                            </div>
                          ))
                      : null}
                    
                  </div>
                </div>
                <button className={styles.bottom_home_btn} onClick={allevents}>
                  More Events
                </button>
                <div>
                  {/* <div className="wts_header">
                    <h1 className="wts_header_h1">Must See Events</h1>
                    <p className="wts_header_p">View All</p>
                  </div> */}
                  <div className="wts-on" style={{ display: "none" }}>
                    <div className="" style={{ marginBottom: "6rem" }}>
                      <div
                        className="images"
                        style={{
                          display: "flex",
                          marginLeft: "-52px",
                          height: "100vh",
                        }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Footer/>
      </Suspense>
    </>
  );
};

// export default Home;
export async function  getStaticProps() {
const res = await fetch("https://candleriggs-staging-73rkv.ondigitalocean.app/api/getActiveEvents");
const posts = await res.json();
// console.log(posts)
return {
  props:{
    posts
  }
  }
}

