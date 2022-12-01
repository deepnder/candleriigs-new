import { MdDelete, MdFileDownload } from "react-icons/md";
// import { HiPencil } from "react-icons/hi";
import dashboardimage from "./AdminImages/dashboardimage.png";
// import { AiOutlinePlus } from "react-icons/ai";
// import { Link } from "react-router-dom";
import "./ReportsAboutEvent.css";
import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
// import moment from "moment/moment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function ReportAboutGallery() {
  const [user, setUser] = useState([]);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/getEmailSubscribers"
    );
    // console.log
    const data = await response.json();
    console.log(data);
    setUser(data.Events);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleShow = (_id) =>
  {
    setShow(true);
    setId(_id)
  } 


const download = () => {
  {
    // using Java Script method to get PDF file
    fetch( process.env.REACT_APP_API_URL + "/subscribers/export-to-csv").then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = "EmailSubscribers";
            alink.click();
        })
    })
}
}

  function deleteSubscription(_id) {
    fetch(process.env.REACT_APP_API_URL + `/deleteEmailSubscribers/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        // console.log(resp);
        fetchData();
      });
    });
    // console.log(_id);
    handleClose(false);
  }

  return (
    <><div className="exceedContainer">
      <div className="ReportContainer ">
        <div className="row container">
          <Dashboard />
          <div className="ReportEventRightSide col col-sm-6 ">
            {/* <div className="dashboardHeadings">
              <span className="DashboardBox">
                <img src={dashboardimage} alt="" />
                <img className="dashboardwrite" src={Dashboardwrite} alt="" />
              </span>
            </div> */}
            <div className="dashboardHeadings">
              <span className="DashboardBox" style={{ display: "flex" }}>
                <img
                  src={dashboardimage}
                  style={{ width: "20px", height: "22px", marginTop: "4px" }}
                  alt=""
                />
                {/* <img className="dashboardwrite" src={Dashboardwrite} alt="" /> */}
                <h5
                  style={{
                    fontSize: "25px",
                    fontWeight: "500",
                    marginLeft: "10px",
                    color: "white",
                  }}
                >
                  Dashboard
                </h5>
              </span>
            </div>
            <div className="ReportsHeadings">
              <span className="subs--span" style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
              <h5>Subscribed Report</h5>
              <button className="subs--download-button" style={{
                    position:" absolute",
                    right: "4rem",
                    fontFamily: "Poppins",
                    background: "none",
                    border: "none",
                    fontSize: "1.1rem",
                    fontWeight: "500",
              }} onClick={download}>Export Report <MdFileDownload/></button>
              </span>
              
              <div className="SearchAdd row">
                <div className="ReportSearch col-6">
                  <input
                    style={{ width: "64.5rem" }}
                    type="search"
                    name=""
                    id=""
                    placeholder="&#128269; Search"
                  />
                </div>
                {/* <div className="AddLeadForm col-6">
              <Link to="/add-images">   <button>
                    Add Image <AiOutlinePlus className="leadIcon" />{" "}
                  </button></Link> 
                </div> */}
              </div>
              <div className="reportTable">
                <table>
                  <tr className="tableheading">
                    <th colSpan="1" style={{"position":"relative",left:"35px"}}>Email Address</th>
                    <th colSpan="4">Subscribed date</th>

                    <th colSpan="1">Delete</th>
                  </tr>
                  {user && user.length
                    ? user.map((userss, i) => (
                        <tr className="tableData" key={i}>
                          <td style={{"width":"40%","position":"relative",left:"22px"}}>{userss.email}</td>
                          <td style={{"width":"30%","position":"relative",left:"15px"}}>{userss.date.slice(0, 10)}</td>

                          {/* <td>{userss.bannerEndDate.slice(0,10)}</td>  */}
                          {/* <td>
                        <Link to={`/putgallery/${userss._id}`}>
                          <button >
                            <HiPencil />
                          </button>
                        </Link>
                      </td> */}
                          <td>
                            <button style={{"width":"240%"}}
                              onClick={() => handleShow(userss._id)}
                            >
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
                                    Are you sure you want to delete this Email ? {" "}
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
                                onClick={() => deleteSubscription(userss._id)}
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
                      ))
                    : null}
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
