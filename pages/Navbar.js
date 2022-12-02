import React, { useState } from 'react';
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/Navbar.module.css"
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [search,setSearch] = useState("")
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        console.log(search);
      }
 const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(styles.responsive_nav);
	};
  return (
 <>
 
		<header className={styles.navbarHeader}>
			<h3><Link  href="/">
				<Image width={200} height={200}
              src="https://18-candleriggs.fra1.digitaloceanspaces.com/logo1.png"
              alt="logo" className={styles.navbarImage}
             
            />
			</Link> </h3>
       
          <form action="#" style={{color:"#9ED9ED"}} className={styles.firstSearchBar}>
          <FaSearch style={{ color: "#9E9D9D" }} className={styles.FaSearch} /> <input type="search" className={styles.search_input} onChange={handleSearch} />
          </form>
			<nav className={styles.newNavbarA} ref={navRef}>
				<Link  href="/" className={styles.atag}>Home</Link> 
				<Link  href="/whats-on" className={styles.atag}>What&apos;s On</Link> 
				<Link  href="/book-venue" className={styles.atag}>Book Venue</Link> 
				<Link  href="/gallery" className={styles.atag}>Gallery</Link> 
				<Link  href="/menu" className={styles.atag}>Menu</Link> 
				<Link  href="/contact" className={styles.atag}>Contact Us</Link> 
				<button
					className={`${styles["nav-btn"]} ${styles["nav-close-btn"]}`}
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className={`${styles["nav-btn"]}`} onClick={showNavbar}>
				<FaBars/>
			</button>
		</header>
 </>
  )
}
