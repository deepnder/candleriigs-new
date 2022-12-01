// import { useState, useEffect } from "react";
// import styles from "../candleriigs-new/styles/Home.module.css";
// import Image from "next/legacy/image";
// import styles from "../styles/Home.module.css";

// export default function HomeBanner(props) {
  // const [user, setUser] = useState([]);
  
  // useEffect(()=>{
  //   setUser(props.bannerData)
  //   console.log(props.bannerData);
    
  //     },[]);

  // const mustEvent = async () => {
  //   const response = await fetch(
  //     "https://candleriggs-staging-73rkv.ondigitalocean.app/api/activeBanner"
  //     );
  //     const data = await response.json();
  //     console.log(data.bannerData);
  //     setUser(data.bannerData);
  //   };<div style={{ marginBottom: "42rem" }}></div>;

  // return (<>
  
// </>)
// }
// export async function getServerSideProps(context) {
//   const res = await fetch(
//     "https://candleriggs-staging-73rkv.ondigitalocean.app/api/activeBanner"
//   );
//   const data = await res.json();
//   console.log(data);
//   return {
//     props: {
//       data,
//     },
//   };
// }
