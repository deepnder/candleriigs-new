import {  MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import dashboardimage from "./AdminImages/dashboardimage.png";
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
        <div className="row container">
        <Dashboard/>
          <div className="ReportEventRightSide col col-sm-6 ">
            {/* <div className="dashboardHeadings">
              <span className="DashboardBox">
                <img src={dashboardimage} alt="" />
                <img className="dashboardwrite" src={Dashboardwrite} alt="" />
              </span>
            </div> */}
             <div className="dashboardHeadings">
                <span className="DashboardBox" style={{'display':'flex'}}>
                  <img src={dashboardimage} style={{'width':'20px','height':'22px','marginTop':"4px"}} alt="" />
                  {/* <img className="dashboardwrite" src={Dashboardwrite} alt="" /> */}
                  <h5 style={{"fontSize":"25px",'fontWeight':'500','marginLeft':"10px",'color':"white"}}>Dashboard</h5>
                </span>
              </div>
            <div className="ReportsHeadings">
              <h5>Home page Banners</h5>
              <div className="SearchAdd row">
                <div className="ReportSearch col-6">
                  <input
                    type="search"
                    name=""
                    id=""
                    placeholder="&#128269; Search"
                  />
                </div>
                <div className="AddLeadForm col-6">
              <Link href="/add-banner">   <button>
                    Add Banner <AiOutlinePlus className="leadIcon" />{" "}
                  </button></Link> 
                </div>
              </div>
              <div className="reportTable">
                <table>
                  <tr className="tableheading">
                    <th colSpan="1">Banner Name</th>
                    <th colSpan="1">Listing From</th>
                    <th colSpan="1">Listing To</th>
                    <th colSpan="1">Edit</th>
                    <th colSpan="1">Delete</th>
                  </tr>
                  {user && user.length ? user.map((userss, i) => (
                    <tr className="tableData"  key={i}>
                      <td>{userss.bannerName}</td>
                      {/* <td>{userss.price}</td> */}
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