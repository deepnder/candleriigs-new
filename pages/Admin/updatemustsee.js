// import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dashboardimage from "./AdminImages/dashboardimage.png";
import dragCloud from "./AdminImages/dragCloud.png";
// import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import ButtonLoader from "./ButtonLoader";
import Lines from "../Admin/AdminImages/Lines.png";
import Image from "next/image";

export default function PutMustSeeEvent() {
  // const navigate = useNavigate();
    // const {_id}=useParams();
  const [event, setEvent] = useState([]);
  // const [eventId, setEventId] = useState()
  const [eventNames, setEventNames] = useState([]);
  const fetchData = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/mustSee/${_id}`
    );
    const data = await response.json();
    setEvent(data.msg);
    console.log(data.msg);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchEventName = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/getAllEvent"
    );
    const data = await response.json();
    setEventNames(data.eventData);
    console.log(data);
  };

  useEffect(() => {
    fetchEventName();
  }, []);

  const [data, setData] = useState({
    eventName:"",
  });
  const [mustEventSeeFile, setMustEventSeeFile] = useState(null);
  const [previewFile, setPreviewFile] = useState();
  const [mustEventSeeImageFiles, setMustEventSeeImageFiles] = useState(null);
  const [previewsFiles, setPreviewsFiles] = useState();
  const removeImage1 = () => {
    setMustEventSeeFile();
  };
  const removeImage2 = () => {
    setMustEventSeeImageFiles();
  };
  
  useEffect(() => {
    if (!mustEventSeeFile) {
      setPreviewFile(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(mustEventSeeFile);
    setPreviewFile(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [mustEventSeeFile]);

  useEffect(() => {
    if (!mustEventSeeImageFiles) {
      setPreviewsFiles(undefined);
      return;
    }

    const objectUrls = URL.createObjectURL(mustEventSeeImageFiles);
    setPreviewsFiles(objectUrls);

    return () => URL.revokeObjectURL(objectUrls);
  }, [mustEventSeeImageFiles]);

  const handleChange1 = (e) => {
    let previewFile = e.target.files[0];
    let reader = new FileReader();

    console.log(previewFile);
    reader.onload = function (e) {
      setPreviewFile(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (previewFile.size > 0.2e6) {
      return toast.error("Image size should be less than be 200KB", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    setMustEventSeeFile(e.target.files[0]);
  };
  const handleChange2 = (e) => {
    let previewsFiles = e.target.files[0];
    let reader = new FileReader();

    console.log(previewsFiles);
    reader.onload = function (e) {
      setPreviewsFiles(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (previewsFiles.size > 0.2e6) {
      return toast.error("Image size should be less than be 200KB", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
    setMustEventSeeImageFiles(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    const name =  e.target.value;
    console.log(name);
    fetch(
      process.env.REACT_APP_API_URL + `/findEventByName/${name}`
    ).then((resp)=>resp.json()).then((result)=>{
      console.log(result.msg._id);
      localStorage.setItem("eventId",result.msg._id)
      
      
    });
    
    
    console.log(e.target.value);
  };
  
  // const eventId = localStorage.getItem("eventId")
  console.log(data.eventName)

//  console.log(eventId)
//  console.log(eventId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.eventName==="") {
      return toast.error("Event Name is required",{
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      })
    }


    const formData = new FormData();
    formData.append("mustEventSeeFile", mustEventSeeFile);
    formData.append("mustEventSeeImageFiles", mustEventSeeImageFiles);
    formData.append("eventId", eventId);
    formData.append("eventName",data.eventName)
   
   
    try {
      const response = await axios({
        method: "PUT",
        url: process.env.REACT_APP_API_URL + `/mustSee/${_id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      localStorage.removeItem(eventId)
      // navigate("/all-must-see-events");
    } catch (error) {
      // toast.error(error.response.data.msg.toString(), {
      //   position: "bottom-center",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: false,
      //   progress: undefined,
      // });

      // console.log(error.response.data.msg);
    }

  };

  return (
    <>
      <div className="exceedContainer">
        <div className="EventContainer ">
          <div className="row container">
            <Dashboard />
            <div className="addEventRightSide col col-sm-6 ">
              <form onSubmit={handleSubmit}>
                <div className="dashboardHeadings">
                  <span className="DashboardBox" style={{ display: "flex" }}>
                    <Image
                      src={dashboardimage}
                      style={{
                        width: "20px",
                        height: "22px",
                        marginTop: "4px",
                      }}
                      alt=""
                    />
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
                <div className="h2">
                  <h5>Edit Must See Events</h5>
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
                            <Image
                              src={Lines}
                              alt=""
                              style={{ width: "515px", height: "550px" }}
                            />
                          </div>

                          <div className="dragingpara2">
                            {mustEventSeeFile ? (
                              mustEventSeeFile && (
                                <Image
                                  style={{
                                    marginTop: "-19.5rem",
                                    marginLeft: "-2.1rem",
                                    width: "32.5rem",
                                    height: "29.5rem",
                                  }}
                                  src={previewFile}
                                  alt="slide"
                                />
                              )
                            ) : (
                              <label
                                htmlFor="image"
                                style={{
                                }}
                              >
                                <Image src={event.image} style={{width:"32.2rem",marginTop:"-19.5rem",height:"31rem",marginLeft:"-8rem"}} alt="" />
                                {mustEventSeeFile && (
                                  <Image alt="slide" src={previewFile} />
                                )}
                     
                              </label>
                            )}
                            <input
                              type="file"
                              id="image"
                              onChange={handleChange1}
                              accept="image/*"
                              style={{ display: "none" }}
                            ></input>
                     
                          </div>
                        </div>
                        <div
                          style={{
                            marginLeft: "0rem",
                            position: "relative",
                            left: "4rem",
                          }}
                          className=" col"
                        >
                          <div className="uploadingBanner2">
                            <h5>Upload Main Image (Mobile version)</h5>
                            <p>Supports: PNG , JPEG (Max Size : 200KB )</p>
                          </div>
                          <div className="LinesImagesBanner">
                            <Image
                              src={Lines}
                              alt=""
                              style={{ width: "251px", height: "271px" }}
                            />
                          </div>

                          <div className="dragingpara2">
                            {mustEventSeeImageFiles ? (
                              mustEventSeeImageFiles && (
                                <Image
                                  alt="slide"
                                  style={{
                                    marginTop: "-2rem",
                                    marginLeft: "-2.1rem",
                                    width: "15.8rem",
                                    height: "12rem",
                                  }}
                                  src={previewsFiles}
                                />
                              )
                            ) : (
                              <label
                                htmlFor="mobileImage"
                                style={{
                                  marginTop:"-2rem",
                                  marginLeft:"-2rem",
                                }}
                              >
                                <Image src={event.mobileImage} alt="" style={{width:"15.8rem",height:"12rem"}} />
                             
                                {mustEventSeeImageFiles && (
                                  <Image alt="slide" src={previewsFiles} />
                                )}
                              </label>
                            )}
                            <input
                              type="file"
                              id="mobileImage"
                              onChange={handleChange2}
                              accept="image/*"
                              name=""
                              style={{ display: "none" }}
                            ></input>
                            {/* <p>Drag and drop or browse to choose a file</p> */}
                            {/* {selectedFiles && <Image src={previews}/>} */}
                            {/* <Image src={selectedFiles}/> */}
                          </div>
                       
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="formStart">
                  <h5>Linked Event</h5>
                  <label htmlFor="eventName"></label>

                  <select
                    style={{
                      width: "43rem",
                      borderRadius: "10px",
                      height: "3rem",
                      fontSize: "13px",
                      padding: "12px",
                    }}
                    name="cars"
                    id="eventName"
                    onChange={handleChange}
                    value={data.eventName}
                  >
                    <option>Select Event</option>
                    {eventNames && eventNames.length ? eventNames.map((names,i) => (
                      <option  key={i}>{names.eventName}</option>
                    )):null}

                  </select>
                  <div className="submitButton">
                    <button type="submit">
                      <ButtonLoader />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
