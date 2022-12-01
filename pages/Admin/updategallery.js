import React, { useState, useEffect, Children } from "react";
import dashboardimage from "./AdminImages/dashboardimage.png";
import Dashboard from "./Dashboard";
// import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Lines from "../Admin/AdminImages/Lines.png"


export default function PutGallery() {
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  // const navigate = useNavigate();
  // const {_id}=useParams();
  const [smallMobileImage,setSmallMobileImage] =useState(null)
  const [bigMobileImage,setBigMobileImage] =useState(null)
  const [uploadMainImage, setUploadMainImage] = useState(null);
  const [preview, setPreview] = useState();
  const [uploadMobileImage, setUploadMobileImage] = useState(null);
  const [previews, setPreviews] = useState();
  const [preview1, setPreview1] = useState();
  const [preview2, setPreview2] = useState();

  const [data, setData] = useState({
    category: "",
  });
  const fetchData = async (_id) => {
    const response = await fetch(process.env.REACT_APP_API_URL + `/getGalleryByID/${_id}`);
    const data = await response.json();
    console.log(data.msg);
    setData(data.msg);
  };  


  useEffect(()=>{
    fetchData();
  },[])
 
  const handleFileSelect = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    if (!uploadMainImage) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(uploadMainImage);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadMainImage]);

  useEffect(() => {
    if (!uploadMobileImage) {
      setPreviews(undefined);
      return;
    }

    const objectUrls = URL.createObjectURL(uploadMobileImage);
    setPreviews(objectUrls);

    return () => URL.revokeObjectURL(objectUrls);
  }, [uploadMobileImage]);

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

  const handleChange1 = (e) => {
    let preview = e.target.files[0];
    let reader = new FileReader();

    console.log(preview)
    reader.onload = function (e) {
      setPreview(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    //  if (preview != ".PNG" || preview !=".JPG" ) {
    //       window.alert("File does not support. You must use .png or .jpg ");
    //       return false;
    //    }
    if (preview.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
      return false;
    }
    setUploadMainImage(e.target.files[0]);
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
    if (previews.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
      return false;
    }
    setUploadMobileImage(e.target.files[0]);
  };

  const handleChange3 = (e) => {
    let preview1 = e.target.files[0];
    let reader = new FileReader();

    console.log(preview1);
    reader.onload = function (e) {
      setPreview1(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (preview1.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
      return false;
    } 
      setSmallMobileImage(e.target.files[0]);
    
  };

  const handleChange4 = (e) => {
    let preview2 = e.target.files[0];
    let reader = new FileReader();

    console.log(preview2);
    reader.onload = function (e) {
      setPreview2(e.target.result);
    };
    console.log(reader);
    reader.readAsDataURL(e.target.files[0]);

    if (preview2.size > 2e6) {
      window.alert("Please upload a file smaller than 2MB");
      return false;
    } 
      setBigMobileImage(e.target.files[0]);
    
  };

  console.log(data)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setisButtonDisabled(true)
    const formData = new FormData();
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();




    formData.append("uploadMainImage", uploadMainImage);
    formData1.append("uploadMobileImage", uploadMobileImage);
    formData2.append("smallMobileImage", smallMobileImage);
    formData3.append("bigMobileImage",bigMobileImage);
    formData4.append("category",data.category);



   if(uploadMainImage !== null){
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + `/gallery/image1/${_id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      
     
      // navigate("/all-gallery");
    } catch (error) {
      setisButtonDisabled(false)
      console.log(error);
    }
   }
   if(uploadMobileImage !== null){
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + `/gallery/image2/${_id}`,
        data: formData1,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      
     
      // navigate("/all-gallery");
    } catch (error) {
      setisButtonDisabled(false)
      console.log(error);
    }
   }

   if(smallMobileImage !== null){
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + `/gallery/image3/${_id}`,
        data: formData2,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      
     
      // navigate("/all-gallery");
    } catch (error) {
      setisButtonDisabled(false)
      console.log(error);
    }
   }

   if(bigMobileImage !== null){
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + `/gallery/image4/${_id}`,
        data: formData3,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      
     
      // navigate("/all-gallery");
    } catch (error) {
      setisButtonDisabled(false)
      console.log(error);
    }
   }
   
 

   if(data.category !== ""){
    try {
      const response = await axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + `/gallery/data/${_id}`,
        data: formData4,

        headers: { "Content-Type": "application/json",
        Accept: "application/json",
      },
      });
      console.log(response);
      
     
      // navigate("/all-gallery");
    } catch (error) {
      setisButtonDisabled(false)
      console.log(error);
    }
   }
    }



console.log(data.category)
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
              <div className="h2">
                <h5> Edit Gallery Image</h5>
              </div>
              <div className="uploadingBanner">
                <div className="dragingImageBanner">
                  <div className="dragingparaBanner">
                    <div className="row row-cols-md-2 g-4">
                    <div className=" col">
                        <div className="uploadingBanner2">
                          <h5>Upload Small Image ( Web Version )</h5>
                          <p>
                          Supports : PNG, JPG (Max Size : 200 KB)
                          </p>
                        </div>
                        <div className="LinesImagesBanner">
                          <img src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                        {uploadMobileImage ? (
                            uploadMobileImage && (
                              <img
                                alt="preview"
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
                              <img
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-8.1rem",
                                  width: "21rem",
                                  height: "15rem",
                                }}
                                src={data.uploadMobileImage}
                                alt=""
                              />
                              {uploadMobileImage && (
                                <img alt="preview" src={previews} />
                              )}
                              {/* <p style={{marginLeft:"-2.5rem"}}>Drag and drop or browse to choose a file</p> */}
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
                          {/* {uploadMobileImage && <img src={previews}/>} */}
                        </div>
                      </div>
                      <div className="col">
                        <div className="uploadingBanner2">
                          <h5>Upload Big Image ( Web Version )</h5>
                          <p>
                          Supports : PNG, JPG (Max Size : 200 KB)
                          </p>
                        </div>

                        <div className="LinesImagesBanner">
                          <img src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                        {uploadMainImage ? (
                            uploadMainImage && (
                              <img
                                alt="preview"
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-2.1rem",
                                  width: "32rem",
                                  height: "40rem",
                                }}
                                src={preview}
                              />
                            )
                          ) : (
                            <label htmlFor="uploadMainImage">
                              <img
                                style={{
                                  marginTop: "-5rem",
                                  marginLeft: "-8.1rem",
                                  width: "32rem",
                                  height: "40rem",
                                }}
                                src={data.uploadMainImage}
                                alt=""
                              />
                              {uploadMainImage && (
                                <img alt="preview" src={preview} />
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

                          {/* <p>Drag and drop or browse to choose a file</p> */}
                          {/* {uploadMainImage && <img src={preview}/>} */}
                        </div>
                      </div>
<div style={{ marginLeft: "0rem" }} className=" col">
                        <div className="uploadingBanner2">
                          <h5>Upload Small Image ( Mobile Version )</h5>
                          <p>
                          Supports : PNG, JPG (Max Size : 200 KB)
                          </p>
                        </div>
                        <div className="LinesImagesBanner">
                          <img style={{"width":'12rem',"height":"15rem"}} src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                          {smallMobileImage ? (
                            smallMobileImage && (
                              <img
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
                            <label  style={{"marginLeft":"2.5rem",
                            
                            "marginTop":"25px"
                            }} htmlFor="smallMobileImage">
                              <img 
                              style={{width:"13rem","marginLeft":"-5rem","height":"11rem","marginTop":"-2rem"}}
                              src={data.smallMobileImage} alt="" />
                              {smallMobileImage && (
                                <img alt="slide" src={data.smallMobileImage} />
                              )}
                              <p style={{ marginLeft: "-2.5rem" }}>
                             
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
                          {/* {uploadMobileImage && <img src={previews}/>} */}
                        </div>
                      
                      </div>
                      <div style={{ marginLeft: "-4rem" }} className=" col">
                        <div className="uploadingBanner2">
                        <h5>Upload Small Image ( Mobile Version )</h5>
                          <p>

                          Supports : PNG, JPG (Max Size : 200 KB)
                          </p>
                        </div>
                        <div className="LinesImagesBanner">
                          <img src={Lines} alt="" />
                        </div>

                        <div className="dragingpara2">
                          {bigMobileImage ? (
                            bigMobileImage && (
                              <img
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
                              <img style={{"width":"21rem","height":"15rem","marginLeft":"-8rem","marginTop":"-5rem"}} src={data.bigMobileImage} alt="" />
                              {bigMobileImage && (
                                <img alt="slide" src={data.bigMobileImage} />

                              )}
                              <p style={{ marginLeft: "-2.5rem" }}>
                             
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
                          {/* {uploadMobileImage && <img src={previews}/>} */}
                        </div>
                        
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>{" "}
              <br />
             
              <div className="formStartBanner selectInputForm">
                <h5>Category</h5>
                <label htmlFor="category"></label>

                <select
                  style={{ width: "43rem",borderRadius:"10px",    height: '3rem',
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
