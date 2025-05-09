// import React, {useEffect, useState } from 'react';
// import './Recommended.css';

// import { Link } from 'react-router-dom';
// import { API_KEY, value_Converter } from '../../data';


// const Recommended = ({categoryId}) => {
//  const [apiData,setApiData] = useState([]);

//  const fetchData = async ()=>{
//    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
//    await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))
// }
// useEffect(() =>
// {
//     fetchData();
// },[])

//   return (
//     <div className='recommend'> 
//     {apiData.map((item,index)=>{
//         return(
//             // <Link to={'/video/${item.snippet.categoryId/${item.id'} key={index} className='side-video-list'>
//             <Link to={`/video/${item.id}`} key={index} className='side-video-list'>
//                 <img src={item.snippet.thumbnails.medium.url} alt='' />
//                 <div className='vid-info'>
//                     <h4>{item.snippet.title}</h4>
//                     <p>{value_Converter(item.snippet.channelTitle)}</p>
                   
//                     </div>
//                 </Link>
//         )
//     })}
   
//     </div>
//   );
// };

// export default Recommended;


// import React, { useEffect, useState } from 'react';
// import './Recommended.css';
// import { Link } from 'react-router-dom';
// import { API_KEY, value_Converter } from '../../data';

// const Recommended = ({ categoryId }) => {
//   const [apiData, setApiData] = useState([]);

// //   const fetchData = async () => {
// //     const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
// //     const res = await fetch(relatedVideo_url);
// //     const data = await res.json();
// //     setApiData(data.items);
// //   };
// const fetchData = async () => {
//     try {
//       const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
//       const res = await fetch(relatedVideo_url);
//       const data = await res.json();
  
//       if (data && data.items) {
//         setApiData(data.items);
//       } else {
//         setApiData([]); // fallback to empty array
//       }
//     } catch (error) {
//       console.error("Error fetching recommended videos:", error);
//       setApiData([]); // avoid crash on fetch error
//     }
//   };
  

//   useEffect(() => {
//     fetchData();
//   }, [categoryId]);

//   return (
//     <div className='recommend'>
//       {apiData.map((item, index) => (
//         <Link to={`/video/${item.id}`} key={index} className='side-video-list'>
//         <img src={item.snippet.thumbnails.medium.url} alt='' />
//           <div className='vid-info'>
//             <h4>{item.snippet.title}</h4>
//             <p>{item.snippet.channelTitle}</p>
//             <p>{value_Converter(item.statistics.viewCount)} Views</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Recommended;



// import React, { useEffect, useState } from 'react';
// import './Recommended.css';
// import { Link } from 'react-router-dom';
// import { API_KEY, value_Converter } from '../../data';

// const Recommended = ({ categoryId }) => {
//   const [apiData, setApiData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
//       const res = await fetch(relatedVideo_url);
//       const data = await res.json();

//       if (data && data.items) {
//         setApiData(data.items);
//       } else {
//         setApiData([]); // Fallback to empty array if no data
//       }
//     } catch (error) {
//       console.error("Error fetching recommended videos:", error);
//       setApiData([]); // Avoid crash on fetch error
//     }
//   };

//   useEffect(() => {
//     console.log("Fetching recommended videos for category:", categoryId); // Debugging log

//     fetchData();
//   }, [categoryId]);

//   return (
//     <div className='recommend'>
//       {apiData.length > 0 ? (
//         apiData.map((item, index) => (
//           <Link to={`/video/${item.id}`} key={index} className='side-video-list'>
//             <img
//               src={item.snippet.thumbnails.medium.url}
//               alt={item.snippet.title}
//               className='video-thumbnail'
//             />
//             <div className='vid-info'>
//               <h4>{item.snippet.title}</h4>
//               <p>{item.snippet.channelTitle}</p>
//               <p>{value_Converter(item.statistics.viewCount)} Views</p>
//             </div>
//           </Link>
//         ))
//       ) : (
//         <p>No recommended videos available</p>
//       )}
//     </div>
//   );
// };

// export default Recommended;




import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_Converter } from '../../data';

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetch
      const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const res = await fetch(relatedVideo_url);
      const data = await res.json();

      if (data && data.items) {
        setApiData(data.items);
        setError(null); // Reset error if data is successful
      } else {
        setApiData([]);
        setError("No recommended videos found."); // Handle no data case
      }
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
      setError("Error fetching videos, please try again later.");
      setApiData([]);
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  return (
    <div className='recommend'>
      {loading ? (
        <p>Loading recommended videos...</p> // Show loading state
      ) : error ? (
        <p>{error}</p> // Show error message
      ) : apiData.length > 0 ? (
        apiData.map((item, index) => (
          <Link to={`/video/${item.id}`} key={index} className='side-video-list'>
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
              className='video-thumbnail'
            />
            <div className='vid-info'>
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{value_Converter(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No recommended videos available</p>
      )}
    </div>
  );
};

export default Recommended;
