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
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import dayjs from "dayjs";

export default function ReportAboutGallery() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const handleClose = () => setShow(false);
  
  
    const [user, setUser] = useState([])


  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/getGallery");
    const data = await response.json();
    console.log(data.gallery)
    setUser(data.gallery);
  };  

  useEffect(()=>{
    fetchData();
  },[])
  const handleShow = (_id) =>
  {
    setShow(true);
    setId(_id)
  } 
  function deleteGallery(_id){
    fetch(process.env.REACT_APP_API_URL + `/deleteGallery/${id}`,{
      method:"DELETE",
      
    }).then((result)=>{
    result.json().then((resp)=>{
    console.log(resp);
    fetchData();
    })
    })
    console.log(id)
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
              <h5>Gallery</h5>
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
              <Link href="/add-images">   <button>
                    Add Image <AiOutlinePlus className="leadIcon" />{" "}
                  </button></Link> 
                </div>
              </div>
              <div className="reportTable">
                <table>
                  <tr className="tableheading">
                    <th colSpan="1">Image Name</th>
                    <th colSpan="1">Category</th>
                    <th colSpan="1">Uploaded Date</th>
                    <th colSpan="1">Edit</th>
                    <th colSpan="1">Delete</th>
                  </tr>
                  {user && user.length ? user.map((userss, i) => (
                    <tr className="tableData"  key={i}>
                   <td>{userss.uploadMainImage.slice(0,50)
}</td>
                      <td>{userss.category}</td>
                      <td>{dayjs( userss.updatedAt.slice(0,10)).format("MMM D YYYY")}</td>
                      {/* <td>{userss.bannerEndDate.slice(0,10)}</td>  */}
                      <td>
                        <Link href={`/putgallery/${userss._id}`}>
                          <button >
                            <HiPencil />
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button  onClick={()=>handleShow(userss._id)}>
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
                                    Are you sure you want href delete this Image ? {" "}
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
                                onClick={() => deleteGallery(userss._id)}
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
  )
}
