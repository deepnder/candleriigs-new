import Image from "next/image";
import menu1 from "../Images/menu1.png"
import menu2 from "../Images/menu2.png"
import menu3 from "../Images/menu3.png"
import menu4 from "../Images/menu4.png"
// import Navbar from './Navbar';
// import Footer from './Footer';
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

export default function Menu() {
  const Navbar = dynamic(() => import("./NavBar"), {
    ssr: false
  });
  const Footer = dynamic(() => import("./Footer"), {
    ssr: false
  });
  return (
  <>
 <Suspense fallback={<div className="loading-lazy">loading....</div>}>

<Navbar />
</Suspense>
    <div className="container menuContainer" style={{marginTop:"3rem"}}>
      <h1 className="menu_heading1" style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",marginBottom:"2.5rem"}}>18 Candleriggs</h1>
        <div className="menu--menu1">
          <Image src={menu1} alt="menu" className="menu--menu1--image1 img-fluid" />
        </div>
        <div className="menu--menu1">
          <Image src={menu2} alt="menu" className="menu--menu1--image1 img-fluid"  style={{marginTop:"1rem"}} />
        </div>
        <div className="menu--menu1">
          <Image src={menu3} alt="menu" className="menu--menu1--image1 img-fluid"   style={{marginTop:"1rem"}}/>
        </div>
        <div className="menu--menu1">
          <Image src={menu4} style={{marginBottom: "2rem" ,marginTop:"1rem"}}alt="menu" className="menu--menu1--image1 img-fluid" />
        </div>
      </div>
      <Suspense fallback={<div className="loading-lazy">loading....</div>}>
        <Footer/>
      </Suspense>
  </>
  )
}

