import React from 'react'
// import { Link, useNavigate } from 'react-router-dom';
import {HiTag} from 'react-icons/hi';
import {BsPencilSquare} from 'react-icons/bs';
import {BsImage} from 'react-icons/bs';
import {RiLogoutCircleFill} from 'react-icons/ri'
import {TbBellRinging} from 'react-icons/tb';
import Link from "next/link"


// import logo1 from '../../image/logo1.png'
export default function Dashboard() {
  // const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // navigate("/login")

  }
  return (
    <>
     <div style={{background:"#270F33"}} className="addEvent col-1">
          <Link href="/">  <img className="candleriggs" style={{'width':'200px'}} src="https://18-candleriggs.fra1.digitaloceanspaces.com/logo1.png" alt="" /></Link>
            <div className="addEventLinks">
              <div className="addeventImage">
              <div className="lists">
                  <HiTag className="listIcon"/><Link href="/" style={{'color':"white"}}> Events</Link>
                  </div>
                <div className="addeventSecond">
                    <div className="lists">
                  <BsPencilSquare className="listIcon"/><Link href="/all-banners" style={{'color':"white"}}> Home Page Banners</Link>
                  </div>
                  <div className="lists"  >
                  <BsPencilSquare className="listIcon"/><Link href="/all-must-see-events" style={{'color':"white"}}> Must See Events</Link>
                  </div>
                      <div className="lists">
                  <BsImage className="listIcon"/><Link href="/all-gallery" style={{marginLeft:"0.9rem",'color':"white"}}>Gallery </Link>
                  </div>
                  <div className="lists">
                  <TbBellRinging className="listIcon"/><Link href="/all-subscription" style={{marginLeft:"0.9rem",'color':"white"}}>Subscriptions </Link>
                  </div>
                 
                  <div className="lists" style={{'color':"white"}}>
                  <RiLogoutCircleFill />  <button style={{border:"none",background:"transparent",fontWeight:"600",letterSpacing:"0.4px",marginLeft:"0.6rem",'color':"white"}} onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
         
          </div>
    
    </>
  )
}
