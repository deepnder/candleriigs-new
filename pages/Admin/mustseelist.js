import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
import Image from "next/image";
import dashboardimage from "../Admin/AdminImages/dashboardimage.png";
import styles from "../../styles/ReportsAboutEvent.module.css";


export default function ReportsMustSee() {
  const [user, setUser] = useState([]);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const mustEvent = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/mustSee");
    const data = await response.json();
    console.log(data.data);
    setUser(data.data);
  };
  useEffect(() => {
    mustEvent();
  }, []);
  function deleteMustSee(_id) {
    fetch(process.env.REACT_APP_API_URL + `/mustSee/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
       mustEvent();
      });
    });
    console.log(_id);
    handleClose(false);
  }
  const handleShow = (_id) =>
  {
    setShow(true);
    setId(_id)
  } 
  return (
    <>
      <div className="exceedContainer">
        <div className="ReportContainer ">
          <div className="row container" style={{margin:"0px",padding:"0px"}}>
            <Dashboard />
            <div className="ReportEventRightSide col col-sm-6 " style={{marginLeft:"1.5rem"}} >
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
              <div className={styles.ReportsHeadings}>
                <h5>Must See Events</h5>
                <div className={styles.SearchAdd} style={{ display: "flex" }}>
                  <div className={styles.ReportSearch}>
                    <input
                      type="search"
                      style={{
                        width: "52.5rem",
                        height: "4rem",
                        borderRadius: "10px",
                        border: "solid #dadde0",
                      }}
                      name=""
                      id=""
                      placeholder="&#128269; Search"
                    />
                  </div>
                  <div className={styles.AddLeadForm}>
                    <Link href="/add-banner">
                      {" "}
                      <button style={{ border: "none" }}>
                        Add Must See Event <AiOutlinePlus className="leadIcon" />{" "}
                      </button>
                    </Link>
                  </div>
                </div>
                <div className={styles.reportTable}>
                  <table>
                    <tr className={styles.tableheading}>
                      <th colSpan="1">Event Name</th>
                      <th colSpan="1">Edit</th>
                      <th colSpan="1">Delete</th>
                    </tr>
                    {user && user.length
                      ? user.map((userss, i) => (
                          <tr className={styles.tableData} key={i}>
                            <td>{userss.eventData.eventName}</td>
                            <td>
                              <Link href={`/mustSee/${userss._id}`}>
                                <button style={{ marginLeft: "9px" }}>
                                  <HiPencil />
                                </button>
                              </Link>
                            </td>
                            <td>
                              <button
                                style={{ marginLeft: "12px" }}
                                onClick={()=>handleShow(userss._id)}
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
                                    Are you sure you want href delete this Event ? {" "}
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
                                onClick={() => deleteMustSee(userss._id)}
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
