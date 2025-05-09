// import React from 'react';
// import './Video.css';
// import PlayVideo from '../../Components/PlayVideo/PlayVideo';
// import Recommended from '../../Components/Recommended/Recommended';
// import { useParams } from 'react-router-dom';

// const Video = () => {
//   const { videoId, categoryId } = useParams();

//   if (!videoId) {
//     return <p>Error: No video ID provided.</p>; // Handle case if videoId is missing
//   }

//   return (
//     <div className='play-container'>
//       <PlayVideo videoId={videoId} />
//       {categoryId && <Recommended categoryId={categoryId} />} {/* Ensure categoryId exists */}
//     </div>
//   );
// };

// export default Video;


import React from 'react';
import './Video.css';
import PlayVideo from '../../Components/PlayVideo/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';

const Video = () => {
  const { videoId, categoryId } = useParams();

  if (!videoId) {
    return <p>Error: No video ID provided.</p>; // Handle case if videoId is missing
  }

  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      {categoryId && <Recommended categoryId={categoryId} videoId={videoId} />} {/* Ensure categoryId exists */}
    </div>
  );
};

export default Video;
