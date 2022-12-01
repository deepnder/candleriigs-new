import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Footer.module.css";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill, BsFacebook, BsInstagram, BsWindowSidebar} from "react-icons/bs";

const Footer = () => {
  // const [display, setDisplay] = useState(false);

  const [data, setData] = useState({
    Email: "",
    display: false,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", data.Email);
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/createEmailSubscribers",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      // if(data.Email===""){
      //   window.alert("error")
      // }

      setData({
        Email: data.Email,
        display: true,
      });
    } catch (error) {
      toast.error(error.response.data.msg.toString(), {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      console.log(error.response.data.msg);
    }
  };

  return (
    <>
     
      <div 
        id="Contact-us"
        className={styles.footer}
        style={{ background: "#270F33","fontFamily":"Roboto"  }}
      >
        <div className={styles.email}>
          <div className={styles.email_box}>
            <h5>Get Event Updates</h5>
            <div className={styles.form_box}>
              {data.display === false ? (
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="Enter email address"
                    onChange={handleChange}
                    type="email"
                    id="Email"
                  />
                  <button type="submit" className={styles.search_footer}>
                    Submit
                  </button>
                </form>
              ) : (
                <p className={styles.display_email} >
                  Thank you for inquiring, you will get the Event updates on{" "}
                  {data.Email}
                </p>
              )}
            </div>
          </div>
          <div
            className={styles.contact}
            style={{ marginBottom: "0px", display: "grid" }}
          >
            <div className={styles.footer_div}>
              <div className={styles.contact_div}></div>
            </div>
            <h4>Contact Us</h4>
            <div className={styles.footer_div}>
              <div className={styles.class_left}>
                <a
                  href="mailto:events@18candleriggs.com"
                  style={{ textDecoration: "none", color: "white" }}
                  className={styles.contact_links}
                >
                  {" "}
                  <span style={{ fontSize: "25px"
                ,"position":"relative","top":"5px"
                }}>
                  <IoIosMail />

                  </span>{" "}
                  events@18candleriggs.com
                </a>
                <a
                  href="tel:+443302021818"
                  style={{ textDecoration: "none", color: "white" }}
                  className={styles.contact_links}
                >
                  
                  <span style={{ fontSize: "25px","position":"relative","top":"5px" }}>
                  <BsFillTelephoneFill />{" "}

                  </span>
                  0330 202 1818
                </a>
              </div>
              <div
                className={styles.footet_social}
                style={{ marginTop: "10px" }}
              >
                <a
                  href="https://www.facebook.com/18Candleriggs/"
                  style={{
                    paddingRight: "10px",
                    color: "white",
                    paddingTop: "1rem",
                  }}
                >
           
                </a>
                <a
                  href="https://www.instagram.com/18candleriggs/"
                  style={{ color: "white" }}
                >
                
                </a>
                <div className="footet--social" style={{ marginTop: "-18px" }}>
            <a
              href="https://www.facebook.com/18Candleriggs/"
              style={{
                paddingRight: "10px",
                color: "white",
                paddingTop: "1rem",
              }}
            >
              <BsFacebook size={22} />
            </a>
            <a
              href="https://www.instagram.com/18candleriggs/"
              style={{ color: "white" }}
            >
              <BsInstagram size={22} />
            </a>
          </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Footer;
