// import "./AddEvent.css";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import dashboardimage from "./AdminImages/dashboardimage.png";
import TimeDot from "./AdminImages/TimeDot.png";
// import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import ButtonLoader from "./ButtonLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPlusLg } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import Lines from "../Admin/AdminImages/Lines.png"
import Image from "next/image";


export default function PutEvent() {
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  // const { _id } = useParams();
  // const navigate = useNavigate();
  const [data, setData] = useState({
    eventName: "",
    title: "",
    subTitle: "",
    mainDescription: "",
    eventLink: "",
    price: "",
    showStartTime: "",
    doorOpeningTime: "",
    date: "",
    eventStartDate: "",
    selectAge:"",
    addBookingFee: 0,
    eventType:""

  });

  const [selectedFile, setSelectedFile] = useState("");
  const [preview, setPreview] = useState();
  const [selectedFiles, setSelectedFiles] = useState("");
  const [previews, setPreviews] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFiles) {
      setPreviews(undefined);
      return;
    }

    const objectUrls = URL.createObjectURL(selectedFiles);
    setPreviews(objectUrls);

    return () => URL.revokeObjectURL(objectUrls);
  }, [selectedFiles]);

  const handleChange1 = (e) => {
    let preview = e.target.files[0];
    let reader = new FileReader();

    console.log(preview);
    reader.onload = function (e) {
      setPreview(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    //  if (preview != ".PNG" || preview !=".JPG" ) {
    //       window.alert("File does not support. You must use .png or .jpg ");
    //       return false;
    //    }
    // if (preview.size > 0.2e6) {
    //   window.alert("Please upload a file smaller than 200KB");
    //   return false;
    // }
    if (preview.size > 0.2e6) {
      return toast.error("Image size should be less than be 200KB",{
       position: "bottom-center",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: false,
       draggable: false,
       progress: undefined,
     })
   }
    setSelectedFile(e.target.files[0]);
  };
  const handleChange2 = (e) => {
    let previews = e.target.files[0];
    let reader = new FileReader();

    console.log(previews);
    reader.onload = function (e) {
      setPreviews(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    //  if (preview != ".PNG" || preview !=".JPG" ) {
    //       window.alert("File does not support. You must use .png or .jpg ");
    //       return false;
    //    }
    // if (previews.size > 0.2e6) {
    //   window.alert("Please upload a file smaller than 200KB");
    //   return false;
    // }
    if (previews.size > 0.2e6) {
      return toast.error("Image size should be less than be 200KB",{
       position: "bottom-center",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: false,
       draggable: false,
       progress: undefined,
     })
   }
    setSelectedFiles(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    // setSelectedFile(e.target.files[0])
    // setSelectedFiles(e.target.files[0])
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if(reader.readyState === 2){
    //     setSelectedFile(reader.result)
    //   }
    // }
    // reader.readAsDataURL(e.target.files[0])
    // setSelectedFiles(e.target.files[0])
  };

  // const formData = {
  //   data: data,
  // };
  // console.log(data);
  // console.log(selectedFile);
  const fetchDatas = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/getEvent/${_id}`
    );
    const data = await response.json();
    // console.log(data);
    setData(data.msg);
  };

  useEffect(() => {
    fetchDatas();
  }, []);
  function deleteEvent(_id) {
    fetch(process.env.REACT_APP_API_URL + `/deleteEvent/${_id}`, {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisButtonDisabled(true)
    // if (data.eventName==="") {
    //   return toast.error("Event Name is required",{
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   })
    // }
    // if (data.title==="") {
    //   return toast.error("Title is required",{
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   })
    // }
    // if (data.subTitle==="") {
    //   return toast.error("Short Description is required",{
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   })
    // }
    // if (data.mainDescription==="") {
    //   return toast.error("Main Description is required",{
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   })
    // }
    // if (data.eventLink==="") {
    //   return toast.error("Event Link is required",{
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   })
    // }
    // if (data.price ==="") {
    //   return toast.error("Price is required",{
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   })
    // }

    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    formData.append("selectedFiles", selectedFiles);
    formData.append("eventName", data.eventName);
    formData.append("title", data.title);
    formData.append("subTitle", data.subTitle);
    formData.append("mainDescription", data.mainDescription);
    formData.append("eventLink", data.eventLink);
    formData.append("price", data.price);
    formData.append("showStartTime", data.showStartTime);
    formData.append("doorOpeningTime", data.doorOpeningTime);
    formData.append("date", data.date);
    formData.append("eventStartDate", data.eventStartDate);
    formData.append("selectAge",data.selectAge);
    formData.append("addBookingFee", data.addBookingFee);
    formData.append("eventType", data.eventType);

    try {
      const response = await axios({
        method: "put",
        url: process.env.REACT_APP_API_URL + `/updateEvent/${_id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      // navigate("/all-events");
    } catch (error) {
      toast.error(error.response.data.msg.toString(), {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      
      setisButtonDisabled(false)
      console.log(error);
    }
  };
  const [datas, setDatas] = useState([]);
  const [isopen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchData = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/getAllEvent"
    );
    const data = await response.json();
    setDatas(data.eventData);
  };

  useEffect(() => {
    fetchData();
  }, []);
  function deleteEvent(_id) {
    fetch(process.env.REACT_APP_API_URL + `/deleteEvent/${_id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        fetchData();
      });
    });
    console.log(_id);
    handleClose(false);
    // navigate("/all-events")
  }

  return (
    <>
    <div className="exceedContainer">
      <div className="EventContainer ">
        <div className="row container">
          <Dashboard />
          <div className="addEventRightSide col col-sm-6 ">
            <form onSubmit={handleSubmit}>
              {/* <div className="dashboardHeadings">
                <span className="DashboardBox">
                  <Image src={dashboardimage} alt="" />
                  <Image className="dashboardwrite" src={Dashboardwrite} alt="" />
                </span>
              </div> */}
              <div className="dashboardHeadings">
                <span className="DashboardBox" style={{ display: "flex" }}>
                  <Image
                    src={dashboardimage}
                    style={{ width: "20px", height: "22px", marginTop: "4px" }}
                    alt=""
                  />
                  {/* <Image className="dashboardwrite" src={Dashboardwrite} alt="" /> */}
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
              <div className="edit_eventdiv" style={{"display":"flex","justifyContent":"space-between",width
            :"64rem"}}>
              <div className="h2">
                <h5>Edit Event</h5>
              </div>
              <div className="h2">
             
                         
                         
                          
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
                                    Are you sure you want to delete this Event ?{" "}
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
                                onClick={() => deleteEvent(_id)}
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
                          <h5 onClick={handleShow}>
                            <MdDelete style={{cursor:"pointer"}} />  Delete
                          </h5>
                
              </div>
              </div>
              
              <div className="uploadingBanner">
                <div className="dragingImageBanner">
                  <div className="dragingparaBanner">
                    <div className="row row-cols-md-2 g-4">
                      <div className="col">
                        <div className="uploadingBanner2">
                          <h5>Upload Main Image</h5>
                          <p>Supports: PNG , JPEG (Max Size : 200KB )</p>
                        </div>

                        <div className="LinesImagesBanner">
                          <Image src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                          {selectedFile ? (
                            selectedFile && (
                              <Image 
                                alt="slider"
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-2.1rem",
                                  width: "21rem",
                                  height: "23rem",
                                }}
                                src={preview}
                              />
                            )
                          ) : (
                            <label htmlFor="uploadMainImage">
                              <Image
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-8.1rem",
                                  width: "21rem",
                                  height: "23rem",
                                }}
                                src={data.uploadMainImage}
                                alt=""
                              />
                              {selectedFile && (
                                <Image alt="slider" src={preview} />
                              )}
                              {/* <p style={{marginLeft:"-2.5rem"}}>Drag and drop or browse to choose a file</p> */}
                            </label>
                          )}
                          <input
                            type="file"
                            id="uploadMainImage"
                            onChange={handleChange1}
                            accept="image/*"
                            style={{ display: "none" }}
                          ></input>

                          {/* <p>Drag and drop or browse to choose a file</p>
                        {selectedFile && <Image src={preview}/>} */}
                        </div>
                      </div>

                      <div style={{ marginLeft: "-7rem" }} className=" col">
                        <div className="uploadingBanner2">
                          <h5>Upload Main Image (Mobile version)</h5>
                          <p>Supports: PNG , JPEG (Max Size : 200KB )</p>
                        </div>
                        <div className="LinesImagesBanner">
                          <Image src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                          {selectedFiles ? (
                            selectedFiles && (
                              <Image
                                alt="slider"
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-2.1rem",
                                  width: "21rem",
                                  height: "23rem",
                                }}
                                src={previews}
                              />
                            )
                          ) : (
                            <label htmlFor="uploadMobileImage">
                              <Image
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-8.1rem",
                                  width: "21rem",
                                  height: "23rem",
                                }}
                                src={data.uploadMobileImage}
                                alt=""
                              />
                              {/* <p style={{marginLeft:"-2.5rem"}}>Drag and drop or browse to choose a file</p> */}
                              {selectedFiles && (
                                <Image alt="slider" src={previews} />
                              )}
                            </label>
                          )}
                          <input
                            type="file"
                            id="uploadMobileImage"
                            onChange={handleChange2}
                            accept="image/*"
                            name=""
                            style={{ display: "none" }}
                          ></input>
                          {/* <p>Drag and drop or browse to choose a file</p>
                        {selectedFiles && <Image src={previews}/>} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="formStart">
                <div className="mb-3">
                  <label htmlFor="eventName" className="form-label">
                    Event Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    id="eventName"
                    aria-describedby="emailHelp"
                    value={data.eventName}
                    maxLength={40}
                    onChange={handleChange}
                  />
                </div>
                <span className="characterEdit">40 Character</span>

                <div className="mb-3" style={{ marginTop: "-1.3rem" }}>
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    className="form-control"
                    id="title"
                    maxLength={80}
                    aria-describedby="emailHelp"
                    value={data.title}
                    onChange={handleChange}
                  />
                </div>
                <span className="characterEdit">80 Character</span>

                <div className="mb-3" style={{ marginTop: "-1.3rem" }}>
                  <label htmlFor="subTitle" className="form-label">
                    Short Description
                  </label>
                  <textarea
                    placeholder="Enter short description"
                    id="subTitle"
                    value={data.subTitle}
                    onChange={handleChange}
                    maxLength={160}
                    className="textareScroll1"
                    rows="2.5"
                    cols={95}
                    style={{ borderRadius: "5px", border: "solid #dadde0" }}
                  ></textarea>
                </div>
                <span className="characterEdit">160 Character</span>
                <div className="mb-3" style={{ marginTop: "-1.3rem" }}>
                  <label htmlFor="" className="form-label">
                    Main Description
                  </label>
                  <textarea
                  id="mainDescription"
                  value={data.mainDescription}
                  onChange={handleChange}
                    className="textareScroll"
                    placeholder="Enter main description"
                    maxLength={500}
                    rows="5"
                    cols="95"
                    style={{ borderRadius: "5px", border: "solid #dadde0" }}
                  ></textarea>
                </div>
                <span className="characterEdit">500 Character</span>
                <div className="mb-3" style={{ marginTop: "-1.3rem" }}>
                  <label htmlFor="eventLink" className="form-label">
                    Event Link
                  </label>
                  <input
                    type="url"
                    placeholder=" Event Link"
                    className="form-control"
                    id="eventLink"
                    aria-describedby="emailHelp"
                    value={data.eventLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="row row-cols-md-2 g-4">
                  <div className="col">
                  <div className="euroPlaceholder  mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>

                  <input
                  style={{ width: "20rem" }}
                    placeholder="£"
                    type="number"
                    className="form-control"
                    id="price"
                    aria-describedby="emailHelp"
                    value={data.price}
                    onChange={handleChange}
                  />
                </div>
                    </div> 
                    <div className="col">
                   
                    <BsPlusLg
                      style={{
                        position: "relative",
                        top: "2.5rem",
                        fontSize: "1.2rem",
                        left: "2rem",
                      }}
                    />
                    <div
                      className="euroPlaceholder  mb-3"
                      style={{ marginLeft: "4.5rem", marginTop: "-1.4rem" }}
                    >
                      <label htmlFor="addBookingFee" className="form-label">
                        Add Booking Fee{" "}
                        <span style={{ opacity: "70%", fontSize: "13px" }}>
                          (optional)
                        </span>
                      </label>

                      <input
                        style={{ width: "21rem" }}
                        placeholder="£"
                        type="number"
                        className="form-control"
                        id="addBookingFee"
                        aria-describedby="emailHelp"
                        value={data.addBookingFee}
                        onChange={handleChange}
                      />
                    </div>
                  </div> 
                    </div>     
            
                <br />
                <br />
                <div
                  className="startTime startTimeEvent"
                  style={{ marginLeft: "-1rem" }}
                >
                  <div className="container">
                    <div className="row row-cols-3">
                      <div className="timeHeading col">
                        <label htmlFor="title" className="form-label">
                          Show Start Time
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Enter show start time"
                          className="form-control"
                          id="showStartTime"
                          maxLength={80}
                          aria-describedby="emailHelp"
                          value={data.showStartTime.toLowerCase()}
                          onChange={handleChange}
                          style={{
                            width: "10rem",
                            height: "3rem",
                            fontSize: "13px",
                          }}
                        />
 <span className="timeEdit" style={{fontSize:"12px",fontFamily: "Poppins",
fontWeight: 400,color:"9E9D9D",opacity:"90%"
}}>eg: 8pm</span>
                      </div>
                      <div className="timeHeading col">
                        <label htmlFor="title" className="form-label">
                          Door Opening Time
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Enter show start time"
                          className="form-control"
                          id="doorOpeningTime"
                          maxLength={80}
                          aria-describedby="emailHelp"
                          value={data.doorOpeningTime.toLowerCase()}
                          onChange={handleChange}
                          style={{
                            width: "10rem",
                            height: "3rem",
                            fontSize: "13px",
                          }}
                        />
                             <span className="timeEdit" style={{fontSize:"12px",fontFamily: "Poppins",
fontWeight: 400,color:"9E9D9D",opacity:"90%"
}}>eg: 6:30pm</span>
                      </div>
                      <div className="col">
                        <label
                          htmlFor="selectAge
"
                        >
                          Select Age
                        </label>

                        <select
                          style={{
                            width: "12rem",
                            height: "3rem",
                            fontSize: "13px",
                            borderRadius: "10px",
                            padding: "12px",
                            marginTop: "8px",
                            border: "solid #dadde0",
                          }}
                          name="cars"
                  id="selectAge"
                  onChange={handleChange}
                  value={data.selectAge}
                        >
                          <option>Dont Show</option>
                          <option>18+</option>
                          <option>All Ages</option>
                        </select>
                      </div>
                      <div
                        className="timeHeading datenewStyle timeheadingDate TimeHeadingTime col"
                        style={
                          {
                            // marginRight: "-20rem",
                            // marginLeft: "3rem",
                          }
                        }
                      >
                        <p>Display Event Listing From</p>{" "}
                        <input
                          required
                          type="date"
                          name="date"
                          // style={{ marginTop: "1rem" }}
                          id="eventStartDate"
                          value={data.eventStartDate === null ? data.eventStartDate : data.eventStartDate.slice(0,10) }
                          onChange={handleChange}
                        />
                      </div>
                     
                      <div
                        className="timeHeading datenewStyle timeheadingDate col"
                        style={{
                          // marginRight: "-17rem",
                          marginTop: "2rem",
                        }}
                      >
                        <p>Event Date</p>{" "}
                        <input
                          required
                          type="date"
                          name="date"
                          id="date"
                          // style={{ marginTop: "1rem" }}
                          value={data.date.slice(0, 10)}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col" style={{"marginTop":"31px"}}>
                          <label
                            htmlFor="eventType
"
                          >
                            Event Type
                          </label>

                          <select
                            style={{
                              width: "12rem",
                              height: "3rem",
                              fontSize: "13px",
                              borderRadius: "10px",
                              padding: "12px",
                              marginTop: "8px",
                              border: "solid #dadde0",
                            }}
                            name="cars"
                            id="eventType"
                            onChange={handleChange}
                            value={data.eventType}
                          >
                            <option>Live</option>
                            <option>Sold Out</option>
                            <option>Cancelled</option>
                            <option>Private Booking</option>

                          </select>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="submitButton">
                {isButtonDisabled === false ? (
                      <button
                        className="button btn-danger"
                        type="submit"
                        style={{
                          background: "#fbd07a",
                          width: "208px",
                          height: "62px",
                          fontWeight: "bold",
                          borderRadius: "5px",
                        }}
                      >
                        Submit
                      </button>
                    ) : (
                      <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#003831"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
      </div>

    </>
  );
}
