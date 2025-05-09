// import React, { useState,useEffect } from "react";
// import "./Feed.css";
// import thumbnail1 from "../../../assets/thumbnail1.png";
// import { API_KEY  } from "../../../data";
// import { Link } from "react-router-dom";

// const Feed = ({category}) => {
//     const [data, setData] = useState([]);

//     const fetchData = async () =>{
//         const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
//        await fetch(videoList_url).then(res=>res.json()).then(data=>setData(data.items))
//     }
//   useEffect(()=>{
//     fetchData();
//   },[category])

//   return (
// //     <div className="feed">
// //       {data.map((item, index) =>{
// //         return(
// //         <Link to={`video/${item.id}`} className="card" key={index} >
// //           <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
// //           <h2>{item.snippet.channelTitle}</h2>
// //           <h3>{item.snippet.title}</h3>
// //           <p>{formatViewCount(item.statistics.viewCount)} views &bull; {formatDate(item.snippet.publishedAt)}</p>   
// //          </Link>
// //         )
// // })}
// //     </div>
// <div className="feed">
//     {data.map((item,index)=>{
//         return(
//             <Link to={`video/${item.id}`} className="card" key={index}>
//                 <img src={item.snippet.thumbnails.medium.url} alt="" />
//                 <h2>{item.snippet.channelTitle}</h2>
//                 <h3>{item.snippet.title}</h3>
//                 <p>Welcone</p>
//             </Link>
//         )
//     })}
// </div>
//   );
// };

// export default Feed;


import React, { useState, useEffect } from "react";
import "./Feed.css";

import {value_Converter , API_KEY } from "../../data";
import { Link } from "react-router-dom";
import moment from "moment";


const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoListUrl);
      const result = await response.json();
      setData(result.items || []);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);


  return (
    <div className="feed">
      {data.map((item, index) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <h2>{item.snippet.channelTitle}</h2>
          <h3>{item.snippet.title}</h3>
          <p>{value_Converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
         
        </Link>
      ))}
    </div>
  );
};

export default Feed;



