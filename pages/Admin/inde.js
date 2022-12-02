import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dashboardimage from "./AdminImages/dashboardimage.png";
import Lines from "../Admin/AdminImages/Lines.png";
import dragCloud from "../Admin/AdminImages/dragCloud.png";
import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import { BsPlusLg } from "react-icons/bs";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

export default function AddEvent() {
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  const removeImage1 = () => {
    setSelectedFile();
  };
  const removeImage2 = () => {
    setSelectedFiles();
  };

  const [data, setData] = useState({
    eventName: "",
    title: "",
    subTitle: "",
    mainDescription: "",
    eventLink: "",
    price: "",
    showStartTime: "",
    doorOpeningTime: "",
    date: null,
    eventStartDate: null,
    eventEndDate: null,
    addBookingFee: 0,
    selectAge: "Dont-show",
    eventType:"Live",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [selectedFiles, setSelectedFiles] = useState(null);
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

 
    if (preview.size > 0.2e6) {
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


    if (previews.size > 0.2e6) {
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
    setSelectedFiles(e.target.files[0]);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setisButtonDisabled(true);
    // if (data.eventName === "") {
    //   return toast.error("Event Name is required", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
        
    //   });
    // }
    // if (data.title === "") {
    //   return toast.error("Title is required", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   });
    // }
    // if (data.subTitle === "") {
    //   return toast.error("Short Description is required", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   });
    // }
    // if (data.mainDescription === "") {
    //   return toast.error("Main Description is required", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   });
    // }
    // if (data.eventLink === "") {
    //   return toast.error("Event Link is required", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   });
    // }
    // if (data.price === "") {
    //   return toast.error("Price is required", {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //   });
    // }
    // if (data.price==="") {
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
    formData.append("addBookingFee", data.addBookingFee);
    formData.append("selectAge", data.selectAge);
    formData.append("eventType", data.eventType);

    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/createEvent",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      setData({
        eventName: "",
        title: "",
        subTitle: "",
        mainDescription: "",
        eventLink: "",
        price: "",
        doorOpeningTime: "",
        date: "",
        showStartTime: "",
        eventStartDate: null,
        mainDescription: "",
        addBookingFee: "",
      });
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
      setisButtonDisabled(false);

      // window.alert(error.response.data.msg)
      console.log(error.response.data.msg);
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
                  <h5>Add Event</h5>
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
                              style={{ width: "20rem", height: "28rem" }}
                            />
                          </div>

                          <div className="dragingpara2">
                            {selectedFile ? (
                              selectedFile && (
                                <Image
                                  style={{
                                    marginTop: "-13rem",
                                    marginLeft: "-2.1rem",
                                    width: "21rem",
                                    height: "23rem",
                                  }}
                                  src={preview}
                                  alt="slide"
                                />
                              )
                            ) : (
                              <label
                                htmlFor="uploadMainImage"
                                style={{ position: "relative", bottom: "75px" }}
                              >
                                <Image src={dragCloud} alt="" />
                                {selectedFile && (
                                  <Image alt="slide" src={preview} />
                                )}
                                <p style={{ marginLeft: "-2.5rem" }}>
                                  Click to upload Image size 375*180
                                </p>
                              </label>
                            )}
                            <input
                              type="file"
                              id="uploadMainImage"
                              onChange={handleChange1}
                              accept="image/*"
                              style={{ display: "none" }}
                            ></input>
                            {/* <Image src={selectedFile} /> */}

                            {/* <p>Drag and drop or browse to choose a file</p> */}
                            {/* {selectedFile && <Image src={preview}/>} */}
                          </div>
                          <button
                            className="btn btn-danger"
                            style={{
                              border: "none",
                              marginTop: "2rem",
                              borderRadius: "10px",
                            }}
                            onClick={removeImage1}
                          >
                            Remove Image
                          </button>
                        </div>

                        <div style={{ marginLeft: "-7rem" }} className=" col">
                          <div className="uploadingBanner2">
                            <h5>Upload Main Image (Mobile version)</h5>
                            <p>Supports: PNG , JPEG (Max Size : 200KB )</p>
                          </div>
                          <div className="LinesImagesBanner">
                            <Image
                              src={Lines}
                              alt=""
                              style={{ width: "20rem", height: "28rem" }}
                            />
                          </div>

                          <div className="dragingpara2">
                            {selectedFiles ? (
                              selectedFiles && (
                                <Image
                                  alt="slide"
                                  style={{
                                    marginTop: "-13rem",
                                    marginLeft: "-2.1rem",
                                    width: "21rem",
                                    height: "23rem",
                                  }}
                                  src={previews}
                                />
                              )
                            ) : (
                              <label
                                htmlFor="uploadMobileImage"
                                style={{ position: "relative", bottom: "75px" }}
                              >
                                <Image src={dragCloud} alt="" />
                                <p style={{ marginLeft: "-2.5rem" }}>
                                  Click to Upload Image size 280*380
                                </p>
                                {selectedFiles && (
                                  <Image alt="slide" src={previews} />
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
                            {/* <p>Drag and drop or browse to choose a file</p> */}
                            {/* {selectedFiles && <Image src={previews}/>} */}
                            {/* <Image src={selectedFiles}/> */}
                          </div>
                          <button
                            className="btn btn-danger"
                            style={{
                              border: "none",
                              marginTop: "2rem",
                              borderRadius: "10px",
                            }}
                            onClick={removeImage2}
                          >
                            Remove Image
                          </button>
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
                      rows="2.5"
                      className="textareScroll"
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
                      onChange={handleChange}
                      value={data.mainDescription}
                      placeholder="Enter main description"
                      maxLength={500}
                      rows="5"
                      cols="95"
                      className="textareScroll"
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
                      {" "}
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
                      {" "}
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
                              color: "#B9B9B9",
                            }}
                          />
                          <span
                            className="timeEdit"
                            style={{
                              fontSize: "12px",
                              fontFamily: "Poppins",
                              fontWeight: 400,
                              color: "9E9D9D",
                              opacity: "90%",
                            }}
                          >
                            eg: 8pm
                          </span>
                        </div>

                        <div className="timeHeading col">
                          <label htmlFor="title" className="form-label">
                            Door Opening Time
                          </label>
                          <input
                            type="text"
                            placeholder="Enter opening time"
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
                              color: "#B9B9B9",
                            }}
                          />
                          <span
                            className="timeEdit"
                            style={{
                              fontSize: "12px",
                              fontFamily: "Poppins",
                              fontWeight: 400,
                              color: "9E9D9D",
                              opacity: "90%",
                            }}
                          >
                            eg: 6:30pm
                          </span>
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
                            type="date"
                            name="date"
                            // style={{ marginTop: "1rem" }}
                            id="eventStartDate"
                            value={data.eventStartDate}
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
                            type="date"
                            name="date"
                            id="date"
                            // style={{ marginTop: "1rem" }}
                            value={data.date}
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
        <ToastContainer />
      </div>
    </>
  );
}
