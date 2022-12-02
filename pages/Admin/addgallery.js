import React, { useState, useEffect } from "react";
import dashboardimage from "./AdminImages/dashboardimage.png";
import { ToastContainer, toast } from "react-toastify";
import dragCloud from "../Admin/AdminImages/dragCloud.png"
import Lines from "../Admin/AdminImages/Lines.png"
import Dashboard from "./Dashboard";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonLoader from "./ButtonLoader";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

export default function AddImage() {
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  // const navigate = useNavigate();
  

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [preview1, setPreview1] = useState();
  const [preview2, setPreview2] = useState();


  const [selectedFilephone, setSelectedFilePhone] = useState(null);
  const [smallMobileImage,setsmallMobileImage] =useState(null)
  const [bigMobileImage,setbigMobileImage] =useState(null)
  const [previews, setPreviews] = useState();
  const removeImage1 = () => {
    setSelectedFile();
  };
  const removeImage2 = () => {
    setSelectedFilePhone();
  };
const removeImage3=()=>{
  setsmallMobileImage()
}
const removeImage4=()=>{
  setbigMobileImage()
}
  const [data, setData] = useState({
    category: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisButtonDisabled(true)
    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("selectedFile", selectedFile);
    formData.append("selectedFilePhone", selectedFilephone);
    formData.append("smallMobileImage", smallMobileImage);

formData.append("bigMobileImage",bigMobileImage);
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/createGallery",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      setData({
        category: "",
      });
      // navigate("/all-gallery");
    } catch (error) {
      setisButtonDisabled(false)
      console.log(error);
    }
  };

  const handleFileSelect = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const handleChange1 = (e) => {
    let preview = e.target.files[0];
    let reader = new FileReader();

    console.log(preview);
    reader.onload = function (e) {
      setPreview(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (preview.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
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

    if (previews.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
      return false;
    }
    setSelectedFilePhone(e.target.files[0]);
  };

  const handleChange3 = (e) => {
    let preview1 = e.target.files[0];
    let reader = new FileReader();

    console.log(preview);
    reader.onload = function (e) {
      setPreview1(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (preview1.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
      return false;
    } else {
      setsmallMobileImage(e.target.files[0]);
    }
  };

  const handleChange4 = (e) => {
    let preview2 = e.target.files[0];
    let reader = new FileReader();

    console.log(preview);
    reader.onload = function (e) {
      setPreview2(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (preview2.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
      return false;
    } else {
      setbigMobileImage(e.target.files[0]);
    }
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

    const objectUrl0 = URL.createObjectURL(selectedFilephone);
    setPreviews(objectUrl0);

    return () => URL.revokeObjectURL(objectUrl0);
  }, [selectedFilephone]);

  useEffect(() => {
    if (!smallMobileImage) {
      setPreview1(undefined);
      return;
    }

    const objectUrl1 = URL.createObjectURL(smallMobileImage);
    setPreview1(objectUrl1);

    return () => URL.revokeObjectURL(objectUrl1);
  }, [smallMobileImage]);
  
useEffect(() => {
    if (!bigMobileImage) {
      setPreview2(undefined);
      return;
    }

    const objectUrl2 = URL.createObjectURL(bigMobileImage);
    setPreview2(objectUrl2);

    return () => URL.revokeObjectURL(objectUrl2);
  }, [bigMobileImage]);
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
                <span className="DashboardBox" style={{'display':'flex'}}>
                  <Image src={dashboardimage} style={{'width':'20px','height':'22px','marginTop':"4px"}} alt="" />
                  {/* <Image className="dashboardwrite" src={Dashboardwrite} alt="" /> */}
                  <h5 style={{"fontSize":"25px",'fontWeight':'500','marginLeft':"10px",'color':"white"}}>Dashboard</h5>
                </span>
              </div>
              <div className="h2">
                <h5>Gallery Image</h5>
              </div>
              <div className="uploadingBanner">
                <div className="dragingImageBanner">
                  <div className="dragingparaBanner">
                    <div className="row row-cols-md-2 g-4">
                    <div style={{ marginLeft: "0rem" }} className=" col">
                        <div className="uploadingBanner2">
                          <h5>Upload Small Image (Web version)</h5>
                          <p>
                            Supports: JPG , PNG (Max Size :
                            2MB)
                          </p>
                        </div>
                        <div className="LinesImagesBanner">
                          <Image src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                          {selectedFilephone ? (
                            selectedFilephone && (
                              <Image
                                alt="slide"
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-2.1rem",
                                  width: "21rem",
                                  height: "15rem",
                                }}
                                src={previews}
                              />
                            )
                          ) : (
                            <label htmlFor="uploadMobileImage">
                              <Image src={dragCloud} alt="" />
                              {selectedFilephone && (
                                <Image alt="slide" src={previews} />
                              )}
                              <p style={{ marginLeft: "-2.5rem" }}>
                              Click to Upload
Image size 305*290
                              </p>
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
                          {/* {selectedFilephone && <Image src={previews}/>} */}
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
                      <div className="col">
                        <div className="uploadingBanner2">
                          <h5>Upload Big Image (Web Version)</h5>
                          <p>
                            Supports: JPG , PNG (Max Size :
                            2MB)
                          </p>
                        </div>

                        <div className="LinesImagesBanner">
                          <Image   style={{"width":"29rem",'height':"40rem"}} src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2" style={{"position":"relative","left":"44px"}}>
                          {selectedFile ? (
                            selectedFile && (
                              <Image
                                alt="slide"
                                style={{
                                  marginTop: "-25rem",
                                  marginLeft: "-5.1rem",
                                  width: "30rem",
                                  height: "35rem",
                                }}
                                src={preview}
                              />
                            )
                          ) : (
                            <label    
                            
                            htmlFor="uploadMainImage">
                              <Image src={dragCloud}
                              style={{"position":"relative","bottom":"10rem", marginLeft: "1rem"}}
                              alt="" />
                              {selectedFile && (
                                <Image alt="slide" src={preview} />
                              )}
                              <p style={{"position":"relative","bottom":"10rem", marginLeft: "-1.5rem" }}>
                              Click to Upload
Image size 630*600
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

                      
                      <div style={{ marginLeft: "0rem" }} className=" col">
                        <div className="uploadingBanner2">
                          <h5>Upload Small Image ( Mobile Version )</h5>
                          <p>
                          Supports : PNG, JPG (Max Size : 200 KB)
                          </p>
                        </div>
                        <div className="LinesImagesBanner">
                          <Image style={{"width":'12rem',"height":"15rem"}} src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                          {smallMobileImage ? (
                            smallMobileImage && (
                              <Image
                                alt="slide"
                                style={{
                                  marginTop: "0rem",
                                  marginLeft: "-2.1rem",
                                  width: "12.2rem",
                                  height: "10rem",
                                }}
                                
                                src={preview1}
                              />
                            )
                          ) : (
                            <label     style={{"marginLeft":"2.5rem",
                            
                            "marginTop":"25px"
                            }} htmlFor="smallMobileImage">
                              <Image src={dragCloud} alt="" />
                              {smallMobileImage && (
                                <Image alt="slide" src={preview1} />
                              )}
                              <p style={{ marginLeft: "-2.5rem" }}>
                              Click to upload
Image size 130*130
                              </p>
                            </label>

                          )}

                          <input
                            type="file"
                            id="smallMobileImage"
                            onChange={handleChange3}
                            accept="image/*"
                            name=""
                            style={{ display: "none" }}
                          ></input>
                          {/* <p>Drag and drop or browse to choose a file</p> */}
                          {/* {selectedFilephone && <Image src={previews}/>} */}
                        </div>
                        <button
                          className="btn btn-danger"
                          style={{
                            border: "none",
                            marginTop: "2rem",
                            borderRadius: "10px",
                          }}
                          onClick={removeImage3}
                        >
                          Remove Image
                        </button>
                      </div>
                      <div style={{ marginLeft: "-4rem" }} className=" col">
                        <div className="uploadingBanner2">
                        <h5>Upload Small Image ( Mobile Version )</h5>
                          <p>

                          Supports : PNG, JPG (Max Size : 200 KB)
                          </p>
                        </div>
                        <div className="LinesImagesBanner">
                          <Image src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                          {bigMobileImage ? (
                            bigMobileImage && (
                              <Image
                                alt="slide"
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-2.1rem",
                                  width: "21rem",
                                  height: "15rem",
                                }}
                                src={preview2}
                              />
                            )
                          ) : (
                            <label htmlFor="bigMobileImage">
                              <Image src={dragCloud} alt="" />
                              {bigMobileImage && (
                                <Image alt="slide" src={preview2} />

                              )}
                              <p style={{ marginLeft: "-2.5rem" }}>
                              Click to upload
Image size 282*272
                              </p>
                            </label>
                          )}

                          <input
                            type="file"
                            id="bigMobileImage"
                            onChange={handleChange4}
                            accept="image/*"
                            name=""
                            style={{ display: "none" }}
                          ></input>
                          {/* <p>Drag and drop or browse to choose a file</p> */}
                          {/* {selectedFilephone && <Image src={previews}/>} */}
                        </div>
                        <button
                          className="btn btn-danger"
                          style={{
                            border: "none",
                            marginTop: "2rem",
                            borderRadius: "10px",
                          }}
                          onClick={removeImage4}
                        >
                          Remove Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
           <br />
              <div className="formStartBanner selectInputForm">
                <h5>Category</h5>
                <label htmlFor="category"></label>

                <select required
                  style={{ width: "43rem",  borderRadius:"10px",  height: '3rem',
                  fontSize: '13px',
                  padding: '12px' }}
                  name="cars"
                  id="category"
                  onChange={handleFileSelect}
                  value={data.category}
                >
                  <option>Select Category</option>
                  <option>Venue</option>
                  <option>Events</option>
                  <option>Food</option>
                </select>
                {/* //category type// */}

                <div className="submitButton" >
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
      </div>
    </>
  );
}
