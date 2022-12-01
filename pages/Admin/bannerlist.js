import {  MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
// import "./ReportsAboutEvent.css";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
import Button from "react-bootstrap/Button";
import dayjs from "dayjs";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import styles from "../Admin/AddBanner.module.css";
import style from "../Admin/ReportsAboutEvent.module.css";
import Image from "next/image";
import dashboardimage from "./AdminImages/dashboardimage.png";

export default function ReportBanner() {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);

  const [id, setId] = useState(null);

  const handleClose = () => setShow(false);
  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/getAllBanner");
    const data = await response.json();
    setUser(data.bannerData);
    console.log(data.bannerData);
  };  
  useEffect(()=>{
    fetchData()
  },[])
  const handleShow = (_id) =>
  {
    setShow(true);
    setId(_id)
  } 
  function deleteBanner(_id){
    fetch(process.env.REACT_APP_API_URL + `/deleteBanner/${id}`,{
      method:"DELETE",
    }).then((result)=>{
    result.json().then((resp)=>{
    console.log(resp);
    fetchData();
    })
    })
    console.log(_id)
    handleClose(false);
    }


    
  return (
    <>
    <div className="exceedContainer">
      <div className="ReportContainer ">
        <div className="row container" style={{margin:"0px",padding:"0px"}}>
        <Dashboard/>
          <div className="ReportEventRightSide col col-sm-6 " style={{marginLeft:"1.5rem"}}>
          <div
                className={styles.dashboardHeadings}
                style={{ background: "#270F33" }}
              >
                <span
                  className={styles.DashboardBox}
                  style={{ display: "flex" }}
                >
                  <Image
                    src={dashboardimage}
                    style={{ width: "20px", height: "22px", marginTop: "8px" }}
                    alt=""
                  />
                  <h5
                    style={{
                      fontSize: "25px",
                      fontWeight: "500",
                      marginLeft: "10px",
                      color: "white",
                      marginTop: "5.6px",
                    }}
                  >
                    Dashboard
                  </h5>
                </span>
              </div>
            <div className={style.ReportsHeadings}>
              <h5>Home page Banners</h5>
              <div className={style.SearchAdd} style={{display:"flex"}}>
                <div className={style.ReportSearch}>
                  <input
                    type="search" style={{ width: "52.5rem", height:"4rem",borderRadius:"10px",border: "solid #dadde0" }}
                    name=""
                    id=""
                    placeholder="&#128269; Search"
                  />
                </div>
                <div className={style.AddLeadForm}  >
              <Link href="/add-banner">   <button style={{border:"none"}}>

                    Add Banner <AiOutlinePlus className="leadIcon" />{" "}
                  </button></Link> 
                </div>
              </div>
              <div className={style.reportTable}>
                <table>
                  <tr className={style.tableheading}>
                    <th colSpan="1">Banner Name</th>
                    <th colSpan="1">Listing From</th>
                    <th colSpan="1">Listing To</th>
                    <th colSpan="1">Edit</th>
                    <th colSpan="1">Delete</th>
                  </tr>
                  {user && user.length ? user.map((userss, i) => (
                    <tr className={style.tableData}  key={i}>
                      <td>{userss.bannerName}</td>
                      <td>{dayjs(userss.bannerStartDate).format("MMM D YYYY")}</td>
                      <td>{dayjs(userss.bannerEndDate).format("MMM D YYYY") }</td>
                      <td>
                        <Link to={`/putbanner/${userss._id}`}>
                          <button style={{marginLeft:"9px"}}   >
                            <HiPencil />
                          </button>
                        </Link>
                        </td>
                        <td>
                        <button style={{marginLeft:"12px"}}  onClick={()=>handleShow(userss._id)}>
                          <MdDelete />
                        </button>
                        <Modal
                            show={show}
                            style={{ marginTop: "10rem" }}
                            onHide={handleClose}
                          >
                            <Modal.Body>
                              <Form>
                                <Form.Group
                                  className="mb-3"
                                  controlId="exampleForm.ControlTextarea1"
                                >
                                  <Form.Label>
                                    Are you sure you want to delete this Image ? {" "}
                                    {" "}

                                  </Form.Label>
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="warning"
                                size="xxl"
                                style={{
                                  position: "relative",
                                  right: "134px",
                                  padding: "14px 49px",
                                }}
                                onClick={() => deleteBanner(userss._id)}
                              >
                                Delete
                              </Button>
                              <Button
                                style={{
                                  color: "black",
                                  backgroundColor: "white",
                                  border: "1px solid black",
                                  padding: "14px 49px",
                                }}
                                onClick={handleClose}
                              >
                                Cancel
                              </Button>
                            </Modal.Footer>
                          </Modal>
                      </td>
                      {/* <td>
                      </td> */}
                    </tr>
                    )
                    
                  ):null}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}