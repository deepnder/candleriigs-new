import { MdDelete, MdFileDownload } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import dashboardimage from "../Admin/AdminImages/dashboardimage.png";
import style from "../../styles/ReportsAboutEvent.module.css";
import styles from "../../styles/AddBanner.module.css";

export default function ReportAboutGallery() {
  const [user, setUser] = useState(false);
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
  const handleShow = (_id) => {
    setShow(true);
    setId(_id);
  };

  const download = () => {
    {
      // using Java Script method to get PDF file
      fetch(process.env.REACT_APP_API_URL + "/subscribers/export-to-csv").then(
        (response) => {
          response.blob().then((blob) => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "EmailSubscribers";
            alink.click();
          });
        }
      );
    }
  };

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
    <>
      <div className="exceedContainer">
        <div className="ReportContainer">
          <div
            className="row container"
            style={{ margin: "0px", padding: "0px" }}
          >
            <Dashboard />
            <div
              className="ReportEventRightSide col col-sm-6 "
              style={{ marginLeft: "1.5rem" }}
            >
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
                <span
                  className="subs--span"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1.4rem",
                  }}
                >
                  <h5>Subscribed Report</h5>
                  <button
                    className="subs--download-button"
                    style={{
                      position: " absolute",
                      right: "11rem",
                      fontFamily: "Poppins",
                      background: "none",
                      border: "none",
                      fontSize: "1.1rem",
                      fontWeight: "500",
                    }}
                    onClick={download}
                  >
                    Export Report <MdFileDownload />
                  </button>
                </span>

                <div className="SearchAdd row">
                  <div className="ReportSearch col-6">
                    <input
                      style={{ width: "65.5rem", height:"4rem",borderRadius:"10px",border: "solid #dadde0" }}

                      type="search"
                      name=""
                      id=""
                      placeholder="&#128269; Search"
                    />
                  </div>
                </div>
                <div className={style.reportTable}>
                  <table style={{ width: "165%" }}>
                    <tr className={style.tableheading}>
                      <th
                        colSpan="1"
                        style={{ position: "relative", left: "35px" }}
                      >
                        Email Address
                      </th>
                      <th colSpan="4">Subscribed date</th>

                      <th colSpan="1">Delete</th>
                    </tr>
                    {user && user.length
                      ? user.map((userss, i) => (
                          <tr className={style.tableData} key={i}>
                            <td
                              style={{
                                width: "40%",
                                position: "relative",
                                left: "22px",
                              }}
                            >
                              {userss.email}
                            </td>
                            <td
                              style={{
                                width: "30%",
                                position: "relative",
                                left: "15px",
                              }}
                            >
                              {userss.date.slice(0, 10)}
                            </td>
                            <td>
                              <button
                                style={{ width: "240%" }}
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
                                        Are you sure you want to delete this
                                        Email ?{" "}
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
                                    onClick={() =>
                                      deleteSubscription(userss._id)
                                    }
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
