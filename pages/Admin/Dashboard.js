import React from 'react'
import {HiTag} from 'react-icons/hi';
import {BsPencilSquare} from 'react-icons/bs';
import {BsImage} from 'react-icons/bs';
import {RiLogoutCircleFill} from 'react-icons/ri'
import {TbBellRinging} from 'react-icons/tb';
import Link from "next/link"
import Image from 'next/image';
import styles from "../../styles/Dashboard.module.css"
export default function Dashboard() {
  // const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    // navigate("/login")
  }
  return (
    <>
     <div style={{background:"#270F33"}} className={`${styles["col-1"]} ${styles["addEvent"]}`}>
          <Link href="/"> 
           <Image className="candleriggs" width={200} height={200} style={{'width':'200px'}} src="https://18-candleriggs.fra1.digitaloceanspaces.com/logo1.png" alt="" />
           </Link>
            <div className={styles.addEventLinks}>
              <div className={styles.addeventImage}>
              <div className={styles.lists}>
                  <HiTag className={styles.listIcon}/><Link href="/" style={{'color':"white"}}>&nbsp;&nbsp;&nbsp;&nbsp;Events</Link>
                  </div>
                    <div className={styles.lists}>
                  <BsPencilSquare className={styles.listIcon}/><Link href="/all-banners" style={{'color':"white"}}>&nbsp;&nbsp;&nbsp;&nbsp;Home Page Banners</Link>
                  </div>
                  <div className={styles.lists}  >
                  <BsPencilSquare className={styles.listIcon}/><Link href="/all-must-see-events" style={{'color':"white"}}>&nbsp;&nbsp;&nbsp;&nbsp;Must See Events</Link>
                  </div>
                      <div className={styles.lists}/>
                      <BsImage className={styles.listIcon}/><Link href="/all-gallery" style={{marginLeft:"0.9rem",'color':"white"}}>Gallery </Link>
                  <div className={styles.lists}>
                  <TbBellRinging className={styles.listIcon}/><Link href="/all-subscription" style={{marginLeft:"0.9rem",'color':"white"}}>Subscriptions </Link>
                  </div>
                 
                  <div className={styles.lists} style={{'color':"white"}}>
                  <RiLogoutCircleFill /><button style={{border:"none",background:"transparent",fontWeight:"600",letterSpacing:"0.4px",marginLeft:"0.6rem",'color':"white"}} onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}
