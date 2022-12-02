import React from "react";
// import "reactjs-popup/dist/index.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { MdEdit } from "react-icons/md";
import { BiDuplicate } from "react-icons/bi";
import dayjs from "dayjs";
import Image from "next/image";
import dashboardimage from "./AdminImages/dashboardimage.png";
import styling from "../../styles/ReportsAboutEvent.module.css"
// import styles from "../Admin/AddBanner.module.css";

export default function ReportsAboutEvent() {
  const [togglebtn, setToggleBtn] = useState(false);
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const handleClose = () => setShow(false);
  const styles = {
    background: {
      color: "#9E9D9D",
    },
    backgroundColor: {
      color: "black",
    },
    displayEvent: {
      display: "none",
    },
  };
  const handleShow = (_id) => {
    setShow(true);
    setId(_id);
  };
  const fetchData = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/getAllEvent"
    );
    const data = await response.json();

    setDatas(data.eventData);
    console.log(data.eventData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  const pastDate = dayjs(yesterday).format();
  const goneDate = new Date(pastDate);
  const showOldEvent = () => {
    if (togglebtn == false) {
      setToggleBtn(true);
    } else {
      setToggleBtn(false);
    }
  };
  const duplicateEvent = async (_id) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/duplicate/${_id}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    fetchData();
  };

  function deleteEvent(_id) {
    fetch(process.env.REACT_APP_API_URL + `/deleteEvent/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        fetchData();
      });
    });
    console.log(_id);
    handleClose(false);
  }
  return (
    <>
      <div className="exceedContainer">
        <div className="ReportContainer ">
          <div
            className="row container"
            style={{ margin: "0px", padding: "0px" }}
          >
            <Dashboard />
            <div className="modal" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>Modal body text goes here.</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ReportEventRightSide col col-sm-6 "
              style={{ marginLeft: "1.5rem" }}
            >
              <div
                className={styling.dashboardHeadings}
                style={{ background: "#270F33" }}
              >
                <span
                  className={styling.DashboardBox}
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
              <div className={styling.ReportsHeadings}>
                <h5>Events</h5>
                <div className={styling.SearchAdd} style={{ display: "flex" }}>
                  <div className={styling.ReportSearch}>
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
                  <div className={styling.AddLeadForm}>
                    <Link href="/add-banner">
                      {" "}
                      <button style={{ border: "none" }}>
                        Add Event <AiOutlinePlus className="leadIcon" />{" "}
                      </button>
                    </Link>
                  </div>
                </div>
                <div
                  className="form-check form-switch" style={{    marginLeft: "54.4rem",
                    width: "11rem",
                    marginTop: "2rem"}}
                >
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckDefault"
                    style={{position:"relative",right:"3rem"}}
                  >
                    Show Past Events
                  </label>
                      <input
                    className="form-check-input"
                    onChange={showOldEvent}
                    type="checkbox"
                    role="switch" style={{position:"absolute"}}
                    id="flexSwitchCheckDefault"
                  />

              
                </div>
                <div className={styling.reportTable}>
                  <table>
                    <tr className={styling.tableheading}>
                      <th colSpan="1">Event Name</th>
                      <th colSpan="1">Price</th>
                      <th colSpan="1">Listing Start Date</th>
                      <th colSpan="1">Event Date</th>
                      <th colSpan="1"> Edit</th>
                      <th colSpan="1">Delete</th>
                      <th colSpan="1">Duplicate</th>
                    </tr>
                    {datas && datas.length
                      ? datas.map((item, i) => (
                          <tr
                            className={styling.tabledata}
                            style={
                              togglebtn === false
                                ? goneDate > new Date(item.date)
                                  ? styles.displayEvent
                                  : styles.backgroundColor
                                : styles.backgroundColor
                            }
                            key={i}
                          >
                            <td
                              style={
                                togglebtn === true &&
                                goneDate > new Date(item.date)
                                  ? styles.background
                                  : styles.backgroundColor
                              }
                            >
                              {item.eventName}
                            </td>
                            <td
                              style={
                                togglebtn === true &&
                                goneDate > new Date(item.date)
                                  ? styles.background
                                  : styles.backgroundColor
                              }
                            >
                              £{item.price}
                            </td>
                            <td
                              style={
                                togglebtn === true &&
                                goneDate > new Date(item.date)
                                  ? styles.background
                                  : styles.backgroundColor
                              }
                            >
                              {item.eventStartDate === null
                                ? null
                                : moment(item.eventStartDate).format(
                                    "MMM Do YYYY"
                                  )}
                            </td>
                            <td
                              style={
                                togglebtn === true &&
                                goneDate > new Date(item.date)
                                  ? styles.background
                                  : styles.backgroundColor
                              }
                            >
                              {dayjs(item.date).format("MMM D YYYY")}
                            </td>
                            <td>
                              <Link href={`/putevent/${item._id}`}>
                                <button
                                  style={
                                    togglebtn === true &&
                                    goneDate > new Date(item.date)
                                      ? styles.background
                                      : styles.backgroundColor
                                  }
                                >
                                  <MdEdit />
                                </button>
                              </Link>
                            </td>
                            <td
                              style={
                                togglebtn === true &&
                                goneDate > new Date(item.date)
                                  ? styles.background
                                  : styles.backgroundColor
                              }
                              onClick={() => handleShow(item._id)}
                            >
                              <MdDelete className="mdDelete" />
                            </td>
                            <td>
                              <BiDuplicate
                                onClick={() => duplicateEvent(item._id)}
                                style={{ cursor: "pointer" }}
                              />
                            </td>
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
                                      Are you sure you want to delete this Event
                                      ?{" "}
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
                                  onClick={() => deleteEvent(item._id)}
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
