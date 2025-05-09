// import React from 'react'
// import './PlayVideo.css'

// import video1 from '../../assets/video.mp4'
// import like from '../../assets/like.png'
// import dislike from '../../assets/dislike.png'
// import share from '../../assets/share.png'
// import save from '../../assets/save.png'
// import jack from '../../assets/jack.png'
// import user_profile from '../../assets/user_profile.jpg'

// const PlayVideo = () => {
//   return (
//     <div className='play-video'>
//        <video src={video1} controls autoPlay muted></video>
//        <h3>Best Youtube Video</h3>
//        <div className='play-video-info'>
//            <p>1525 view &bull; 2 days ago</p>
//            <div>
//             <span><img src={like} alt='' /> </span>
//             <span><img src={dislike} alt='' /> </span>
//             <span><img src={share} alt='' /> </span>
//             <span><img src={save} alt='' /> </span>
//            </div>
//        </div>
//        <hr />
//        <div className='publisher'>
//         <img src={jack} alt=''/>

//        <div>
//        <p>GreatStack</p>
//        <span>1M Subscribers</span>
//        </div>
//        <button>Subscibers</button>
//     </div>   

//     <div className='vid-description'>
//         <p>Channel that makes learing Easy</p>
//         <p>Hey what is going in ur Life</p>
//      < hr />
//      <h4>130 comments</h4>
//      <div className='comment'>
//         <img src={user_profile} alt='' />
//         <div>

//             <h3>Supremt<span>1 day ago</span></h3>
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates consequuntur amet veniam enim est commodi aspernatur perspiciatis maxime voluptatum praesentium adipisci, possimus, non odit id.</p>
//              <div className='comment-action'>
//                 <img src={like} alt='' />
//                 <span>244</span>
//                 <img src={dislike} alt='' />

//              </div>
//            </div>
//      </div>

//      <div className='comment'>
//         <img src={user_profile} alt='' />
//         <div>

//             <h3>Supremt<span>1 day ago</span></h3>
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates consequuntur amet veniam enim est commodi aspernatur perspiciatis maxime voluptatum praesentium adipisci, possimus, non odit id.</p>
//              <div className='comment-action'>
//                 <img src={like} alt='' />
//                 <span>244</span>
//                 <img src={dislike} alt='' />
                
//              </div>
//            </div>
//      </div>

//      <div className='comment'>
//         <img src={user_profile} alt='' />
//         <div>

//             <h3>Supremt<span>1 day ago</span></h3>
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates consequuntur amet veniam enim est commodi aspernatur perspiciatis maxime voluptatum praesentium adipisci, possimus, non odit id.</p>
//              <div className='comment-action'>
//                 <img src={like} alt='' />
//                 <span>244</span>
//                 <img src={dislike} alt='' />
                
//              </div>
//            </div>
//      </div>

//      <div className='comment'>
//         <img src={user_profile} alt='' />
//         <div>

//             <h3>Supremt<span>1 day ago</span></h3>
//             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates consequuntur amet veniam enim est commodi aspernatur perspiciatis maxime voluptatum praesentium adipisci, possimus, non odit id.</p>
//              <div className='comment-action'>
//                 <img src={like} alt='' />
//                 <span>244</span>
//                 <img src={dislike} alt='' />
                
//              </div>
//            </div>
//      </div>
//     </div>

//     </div>
//   )
// }

// export default PlayVideo


// import React, { useEffect, useState } from 'react';
// import './PlayVideo.css';

// import like from '../../assets/like.png';
// import dislike from '../../assets/dislike.png';
// import share from '../../assets/share.png';
// import save from '../../assets/save.png';
// import { API_KEY, value_Converter } from '../../data';
// import moment from 'moment';
// import { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import './PlayVideo.css';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';

import { API_KEY, value_Converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = ({}) => {
  
    const {videoId} = useParams();
    const [apiData,setApiData] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [commentData,setCommentData] = useState([])

    const fetchVideoData = async ()=>{
        const videoDetails_url =  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]))
    }

const fetchOtherData = async () => {
    try {
      // Fetching channel data
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelRes = await fetch(channelData_url);
      const channelJson = await channelRes.json();
      setChannelData(channelJson.items[0]);
  
      // Fetching comment data
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;
      const commentRes = await fetch(comment_url);
      const commentJson = await commentRes.json();
      setCommentData(commentJson.items || []);
    } catch (error) {
      console.error("Error fetching channel or comment data:", error);
    }
  };
  
    useEffect(()=>{
    fetchVideoData();
    },[videoId])

   useEffect(()=>{
    if(apiData)
    {
        fetchOtherData()
    }
    
   },[apiData])

  return (
    <div className='play-video'>
      {/* <iframe  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
      <iframe
  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen></iframe>

      <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
      <div className='play-video-info'>
        <p>
  {apiData?.statistics
    ? value_Converter(apiData.statistics.viewCount)
    : "16K"} Views &bull;{" "}
  {apiData?.snippet
    ? moment(apiData.snippet.publishedAt).fromNow()
    : "some time ago"}
</p>

        <div>
          <span><img src={like} alt='Like' />{apiData?value_Converter(apiData.statistics.likeCount):155}</span>
          <span><img src={dislike} alt='Dislike' />
             
          </span>
          <span><img src={share} alt='Share' /></span>
          <span><img src={save} alt='Save' /></span>
        </div>
      </div>
      <hr />
      <div className='publisher'>
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt='Publisher' />
        <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className='vid-description'>
        <p>{apiData?apiData.snippet.description.slice(0,450):"Description"} </p>
       
        <hr />
        <h4>{apiData?value_Converter(apiData.statistics.commentCount):102} Comments</h4>

        {commentData.map((item, index) =>{
             return(
                <div className='comment' key={index}>
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='User' />
                <div>
                  <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}</h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className='item-action'>
                    <img src={like} alt='' />
                    <span>
                        {value_Converter(item.snippet.topLevelComment.snippet.likeCount)} </span>
                    <img src={dislike} alt='' />
                  </div>
                </div>
              </div>
             )
             }
        )}
      </div>
    </div>
  );
};

export default PlayVideo;
