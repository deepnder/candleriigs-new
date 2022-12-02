import dashboardimage from "./AdminImages/dashboardimage.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { ThreeDots } from "react-loader-spinner";
import dragCloud from "../Admin/AdminImages/dragCloud.png";
import Lines from "../Admin/AdminImages/Lines.png"
import Image from "next/image";

export default function AddBanner() {
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  const removeImage1 = () => {
    setSelectedFile();
  };
  const removeImage2 = () => {
    setSelectedFilePhone();
  };
  const [data, setData] = useState({
    bannerName: "",
    bannerLink: "",
    bannerStartDate: null,
    bannerEndDate: null,
    eventType:"Live",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [selectedFilephone, setSelectedFilePhone] = useState(null);
  const [previews, setPreviews] = useState();
  const handleFileSelect = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

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
    if (!selectedFilephone) {
      setPreviews(undefined);
      return;
    }

    const objectUrls = URL.createObjectURL(selectedFilephone);
    setPreviews(objectUrls);

    return () => URL.revokeObjectURL(objectUrls);
  }, [selectedFilephone]);

  const handleChange1 = (e) => {
    let preview = e.target.files[0];
    let reader = new FileReader();

    console.log(preview);
    reader.onload = function (e) {
      setPreview(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (preview.size > 3e6) {
      window.alert("Please upload a file smaller than 3MB");
      return false;
    } else {
      setSelectedFile(e.target.files[0]);
    }
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

    if (previews.size > 0.5e6) {
      window.alert("Please upload a file smaller than 500KB");
      return false;
    }
    setSelectedFilePhone(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisButtonDisabled(true);
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    formData.append("selectedFilePhone", selectedFilephone);
    formData.append("addBannerImage", data.addBannerImage);
    formData.append("addMobileBannerImage", data.addMobileBannerImage);
    formData.append("bannerName", data.bannerName);
    formData.append("bannerLink", data.bannerLink);
    formData.append("bannerStartHour", data.bannerStartHour);
    formData.append("bannerStartMinute", data.bannerStartMinute);
    formData.append("bannerStartZone", data.bannerStartZone);
    formData.append("bannerCloseHour", data.bannerCloseHour);
    formData.append("bannerCloseMinute", data.bannerCloseMinute);
    formData.append("bannerCloseZone", data.bannerCloseZone);
    formData.append("bannerStartDate", data.bannerStartDate);
    formData.append("bannerEndDate", data.bannerEndDate);
    formData.append("eventType",data.eventType)

    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/createBanner",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      setData({
        bannerName: "",
        bannerLink: "",
        bannerStartHour: "",
        bannerStartMinute: "",
        bannerStartZone: "",
        bannerCloseHour: "",
        bannerCloseMinute: "",
        bannerCloseZone: "",
        bannerStartDate: null,
        bannerEndDate: null,
      });
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      setisButtonDisabled(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="exceedContainer">
        <div className="EventContainer ">
          <div className="row container">
            <Dashboard />
            <div className="addBannerRightSide col col-sm-6 ">
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
                      style={{
                        width: "20px",
                        height: "22px",
                        marginTop: "4px",
                      }}
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
                <div className="h2">
                  <h5>Add Banner</h5>
                </div>
                <div className="uploadingBanner">
                  <div className="dragingImageBanner">
                    <div className="dragingparaBanner">
                      <div className="row row-cols-md-1 g-4">
                        <div className="col">
                          <div className="uploadingBanner2">
                            <h5>Upload Main Image - 1440x692</h5>
                            <p>Supports : PNG, JPEG (Max Size : 3 MB)</p>
                          </div>

                          <div className="LinesImagesBanner">
                            {/* these are just 80% of the 1440x692 so it fits on my laptop screen but keeps the ratio */}
                            <Image
                              src={Lines}
                              alt=""
                              style={{ width: "1021px", height: "553px" }}
                            />
                          </div>

                          <div className="dragingpara2">
                            {selectedFile ? (
                              selectedFile && (
                                <Image
                                  alt="slide"
                                  style={{
                                    marginTop: "-20rem",
                                    marginLeft: "-2.1rem",
                                    width: "1025px",
                                    height: "553px",
                                  }}
                                  src={preview}
                                />
                              )
                            ) : (
                              <label htmlFor="addBannerImage">
                                <Image
                                  src={dragCloud}
                                  alt=""
                                  style={{
                                    position: "relative",
                                    left: "21rem",
                                    top: "-4rem",
                                  }}
                                />
                                {selectedFile && (
                                  <Image alt="slide" src={preview} />
                                )}
                                <p
                                  style={{
                                    position: "relative",
                                    left: "15.3rem",
                                    top: "-4rem",
                                  }}
                                >
                                  Click to upload Image size 1440*692
                                </p>
                              </label>
                            )}
                            <input
                              type="file"
                              id="addBannerImage"
                              onChange={handleChange1}
                              accept="image/*"
                              style={{ display: "none" }}
                            ></input>

                            {/* <p>Drag and drop or browse to choose a file</p> */}
                            {/* {selectedFile && <Image src={preview}/>} */}
                          </div>
                          <button
                            className="btn btn-danger"
                            style={{
                              border: "none",
                              position: "relative",
                              top: "2rem",
                              borderRadius: "10px",
                            }}
                            onClick={removeImage1}
                          >
                            Remove Image
                          </button>
                        </div>

                        <div className=" col">
                          <div className="uploadingBanner2">
                            <h5>
                              Upload Main Image (Mobile version) - 640x360
                            </h5>
                            <p>Supports : PNG, JPEG (Max Size : 500 KB)</p>
                          </div>
                          <div className="LinesImagesBanner">
                            <Image
                              src={Lines}
                              alt=""
                              style={{ width: "640px", height: "360px" }}
                            />
                          </div>

                          <div className="dragingpara2">
                            {selectedFilephone ? (
                              selectedFilephone && (
                                <Image
                                  alt="slide"
                                  style={{
                                    marginTop: "-8rem",
                                    marginLeft: "-2.1rem",
                                    width:"645px",
                                    height:"362px"
                                  }}
                                  src={previews}
                                />
                              )
                            ) : (
                              <label htmlFor="addMobileBannerImage">
                                <Image
                                  style={{
                                    marginLeft: "9rem",
                                    marginTop: "0rem",
                                  }}
                                  src={dragCloud}
                                  alt=""
                                />
                                {selectedFilephone && (
                                  <Image alt="slide" src={previews} />
                                )}
                                <p style={{ marginLeft: "6.8rem" }}>
                                  Click to upload Image size 640*360
                                </p>
                              </label>
                            )}

                            <input
                              type="file"
                              id="addMobileBannerImage"
                              onChange={handleChange2}
                              accept="image/*"
                              name=""
                              style={{ display: "none" }}
                            ></input>
                          </div>
                          <button
                            className="btn btn-danger"
                            style={{
                              border: "none",
                              marginTop: "2.5rem",
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
                <div className="formStartBanner">
                  <div className="mb-3">
                    <label htmlFor="bannerName" className="form-label">
                      Banner Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Banner Name"
                      className="form-control"
                      id="bannerName"
                      onChange={handleFileSelect}
                      aria-describedby="emailHelp"
                      value={data.bannerName}
                      maxLength={30}
                    />
                  </div>
                  <span className="characterEdit">30 Character</span>

                  <div className="mb-3">
                    <label htmlFor="bannerLink" className="form-label">
                      Banner Link
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Banner Title"
                      className="form-control"
                      id="bannerLink"
                      onChange={handleFileSelect}
                      aria-describedby="emailHelp"
                      value={data.bannerLink}
                    />
                  </div>

                  <br />
                  <br />
                  {/* //start time// */}
                  <div className="startTime">
                    <h5>Banner Duration</h5>
                    {/* <div className="container"> */}

                    <div
                      className="row row-cols-3"
                      style={{ marginTop: "-2rem" ,width:"44rem"}}
                    >
                      <div className="timeHeading datenewStyle  TimeHeadingTime col">
                        <p>Display Event Listing From</p>{" "}
                        <input
                          required
                          type="date"
                          name="date"
                          id="bannerStartDate"
                          onChange={handleFileSelect}
                          value={data.bannerStartDate}
                          style={{ width: "" }}
                        />
                      </div>
                      <div className="timeHeading datenewStyle  TimeHeadingTime col">
                        <p>Display Event Listing To</p>{" "}
                        <input
                          required
                          type="date"
                          name="date"
                          id="bannerEndDate"
                          value={data.bannerEndDate}
                          onChange={handleFileSelect}
                        />
                      </div>
                      <div className=" col" style={{"marginTop":"31px"}}>
                          <label
                            htmlFor="eventType
"
                          >
                            Event Type
                          </label>

                          <select
                            style={{
                              width: "12rem",
                              height: "2.9rem",
                              fontSize: "13px",
                              borderRadius: "10px",
                              padding: "10px",
                              marginTop: "16px",
                              border: "solid #dadde0",
                            }}
                            name="cars"
                            id="eventType"
                            onChange={handleFileSelect}
                            value={data.eventType}
                          >
                            <option>Live</option>
                            <option>Sold Out</option>
                            <option>Cancelled</option>
                            <option>Private Booking</option>

                          </select>
                        </div>
                      
                    </div>
                    {/* </div> */}
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
