
import styles from "../Admin/AddBanner.module.css"
import axios from "axios";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ButtonLoader from "./ButtonLoader";
import { ThreeDots } from "react-loader-spinner";
import Lines from "../Admin/AdminImages/Lines.png"
import dashboardimage from "../Admin/AdminImages/dashboardimage.png"
import Image from "next/image"


export default function PutBanner() {
  const [isButtonDisabled, setisButtonDisabled] = useState(false);
  // const navigate = useNavigate();
  // const { _id } = useParams();
  // console.log(_id);
  const [data, setData] = useState({
    bannerName: "",
    bannerLink: "",
    bannerStartDate: "",
    bannerEndDate: "",
    eventType:""
  });



  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [selectedFilephone, setSelectedFilePhone] = useState(null);
  const [previews, setPreviews] = useState();
  const handleFileSelect = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
    // setSelectedFile(e.target.files[0]);
    // setSelectedFilePhone(e.target.files[0]);
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

    //  if (preview != ".PNG" || preview !=".JPG" ) {
    //       window.alert("File does not support. You must use .png or .jpg ");
    //       return false;
    //    }
    if (preview.size > 3e6) {
      window.alert("Please upload a file smaller than 3MB");
      return false;
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
    if (previews.size > 0.5e6) {
      window.alert("Please upload a file smaller than 500 KB");
      return false;
    }
    setSelectedFilePhone(e.target.files[0]);
  };

  const fetchData = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/getBanner/`
    );
    const data = await response.json();
    console.log(data);
    setData(data.msg);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisButtonDisabled(true)
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    formData.append("selectedFilephone", selectedFilephone);
    formData.append("bannerName", data.bannerName);
    formData.append("bannerLink", data.bannerLink);
    formData.append("bannerStartDate", data.bannerStartDate);
    formData.append("bannerEndDate", data.bannerEndDate);
    formData.append("eventType",data.eventType)

    try {
      const response = await axios({
        method: "put",
        url: process.env.REACT_APP_API_URL + `/updateBanner/${_id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);

      // navigate("/all-banners");
    } catch (error) {
      setisButtonDisabled(false)
      console.log(error);
    }
  };
 
  return (
    <>
      <div className={styles.EventContainer}>
        <div className= "row container" style={{padding:"0px" ,margin:"0px"}}>
          <Dashboard />
          <div className="col col-sm-6" style={{marginLeft:"1rem"}}>
            <form onSubmit={handleSubmit}>
        
               <div className={styles.dashboardHeadings} style={{background:"#270F33"}}>
                <span className={styles.DashboardBox}  style={{'display':'flex'}}>
                  <Image src={dashboardimage} style={{'width':'20px','height':'22px','marginTop':"8px"}} alt="" />
                  <h5 style={{"fontSize":"25px",'fontWeight':'500','marginLeft':"10px",'color':"white",'marginTop':"5.6px"}}>Dashboard</h5>
                </span>
              </div>
              <div className={styles.h2}>
                <h5>Edit Banner</h5>
              </div>
              <div className={styles.uploadingBanner}>
                <div className={styles.dragingImageBanner}>
                  <div className= {styles.dragingparaBanner}>
                    <div className="row row-cols-md-1 g-4">
                      <div className="col" >
                        <div className={styles.uploadingBanner2}>
                          <h5>Upload Main Image - 1440x692</h5>
                          <p>
                            Supports: JPG , PNG , SVG , GIF , JPEG (Max Size : 3MB)
                          </p>
                        </div>

                        <div className={styles.LinesImagesBanner}>
                          {/* these are just 80% of the 1440x692 so it fits on my laptop screen but keeps the ratio */}
                          <img src={Lines} alt="" style={{width:"1024px",height:"553px"}} />
                        </div>

                        <div className={styles.dragingpara2}>
                          {selectedFile ? (
                            selectedFile && (
                              <img
                                style={{
                                  marginTop: "-20rem",
                                  marginLeft: "-2.1rem",
                                  width: "1024px",
                                  height: "553px",
                                }}
                                src={preview}
                                alt="preview"
                              />
                            )
                          ) : (
                            <label htmlFor="addBannerImage">
                              <img
                               style={{
                                 marginTop: "-19.5rem",
                                 marginLeft: "-8rem",
                                 width: "1024px",
                                 height: "553px",
                                }}
                                src={data.addBannerImage}
                                alt="preview"
                              />
                              {selectedFile && (
                                <img alt="preview" src={preview} />
                              )}
                            </label>
                          )}

                          <input
                            type="file"
                            id="addBannerImage"
                            onChange={handleChange1}
                            accept="image/*"
                            style={{ display: "none" }}
                          ></input>

                          {/* <p>Drag and drop or browse to choose a file</p>
                        {selectedFile && <img src={preview}/>} */}
                        </div>
                      </div>

                      <div style={{ marginTop: "16rem" }} className=" col">
                        <div className={styles.uploadingBanner2}>
                          <h5>Upload Main Image (Mobile version) - 640x360</h5>
                          <p>
                            Supports : PNG, JPEG (Max Size : 500 KB)
                          </p>
                        </div>
                        <div className={styles.LinesImagesBanner}>
                          <img src={Lines} alt="" style={{width:"645px",height:"360px"}}/>
                        </div>

                        <div className={styles.dragingpara2} >
                          {selectedFilephone ? (
                            selectedFilephone && (
                              <img
                                alt="preview"
                                style={{
                                  marginTop:"-8rem",
                                  marginLeft: "-2.1rem",
                                  width:"645px",
                                  height:"360px"
                                }}
                                src={previews}
                              />
                            )
                          ) : (
                            <label htmlFor="addMobileBannerImage" >
                              <img
                                style={{
                                  marginTop:"-7.5rem",
                                  marginLeft: "-8rem",
                                  width:"645px",
                                  height:"360px"
                                }}
                                src={data.addMobileBannerImage}
                                alt="preview"
                              />
                              {selectedFilephone && (
                                <img alt="preview" src={previews} />
                              )}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.formStartBanner} style={{marginTop:"15rem"}}>
                <div className="mb-3">
                  <label htmlFor="bannerName" className="form-label">
                    Banner Name
                  </label>
                  <input
                    type="text" style={{height:"3rem" ,width:"45rem",boxShadow:" 0px 0px 2px rgb(118, 108, 108)",padding:"12px",fontSize:"12px"}}
                    placeholder="Enter Banner Name"
                    className="form-control"
                    id="bannerName"
                    onChange={handleFileSelect}
                    aria-describedby="emailHelp"
                    value={data.bannerName}
                    maxLength={30}
                  />
                </div>
                <span className={styles.characterEdit}>30 Character</span>

                <div className="mb-3">
                  <label htmlFor="bannerLink" className="form-label">
                    Banner Link
                  </label>
                  <input
                    type="text" style={{height:"3rem" ,width:"45rem",boxShadow:" 0px 0px 2px rgb(118, 108, 108)",padding:"12px",fontSize:"12px"}}
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
                <div className={styles.startTime}>
                  <h5>Banner Duration</h5>
                  <div className="container" style={{marginLeft:"-1.5rem"}}>
                    <div className="row row-cols-3">
                     
                      <div className="timeHeading datenewStyle  TimeHeadingTime col">
                        <p>Banner Start Date</p>{" "}
                        <input 
                          type="date"
                          name="date" className={styles.dateBanner}
                          id="bannerStartDate" 
                          onChange={handleFileSelect}
                          style={{
                            width: "11rem",
                            height: "2.9rem",
                            fontSize: "13px",
                            borderRadius: "10px",
                            padding: "10px",
                            border: "solid #dadde0",
                          }}
                          value={data.bannerStartDate.slice(0,10)}
                        />
                      </div>
                      <div className="timeHeading datenewStyle  TimeHeadingTime col">
                        <p>Banner End Date</p>{" "}
                        <input
                          type="date"
                          name="date" className={styles.dateBanner}
                          id="bannerEndDate" style={{
                            width: "11rem",
                            height: "2.9rem",
                            fontSize: "13px",
                            borderRadius: "10px",
                            padding: "10px",
                            border: "solid #dadde0",
                          }}
                          value={data.bannerEndDate.slice(0,10)}
                          onChange={handleFileSelect}
                        />
                      </div>
                      <div className=" col" >
                          <label
                            htmlFor="eventType"
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
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
             
                <div className="submitButton"style={{marginTop:"7rem"}} >
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
    </>
  );
}
