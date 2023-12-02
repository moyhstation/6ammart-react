import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { IconButton } from '@mui/material';
import { CustomStackFullWidthVideo, PauseButton, PlayButton, PlayButtonWrapper, PlayButtonWrapperInside } from './CustomVideoPlayerStyles.style';

const CustomVideoPlayer = ({ videoUrl }) => {
  const [playing, setPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(true)
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    setShowIcon(true)
  };

  const handleMouseLeave = () => {
    if (!playing) {
      setShowControls(false);
    }
    setShowIcon(false)
  };

  const handleEndVideo = () => {
    setPlaying(false)
  }
  const handlePauseVideo = () => {
    setPlaying(false)
  }
  const handlePlayVideo = () => {
    setPlaying(true)
  }
  return (
    <CustomStackFullWidthVideo
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ReactPlayer
        url={videoUrl}
        playing={playing}
        controls={true}
        onEnded={handleEndVideo}
        onPause={handlePauseVideo}
        onPlay={handlePlayVideo}
        volume={1}
        width="100%"
        // height="100%"
      // height={!videoUrl.includes("https://youtu.be") && "96%"}
      />
      <PlayButtonWrapper
        showControls={showControls}
        showIcon={showIcon}
      >
        <PlayButtonWrapperInside>
          <IconButton
            aria-label="play"
            onClick={togglePlay}>
            {playing ? <PauseButton /> : <PlayButton />}
          </IconButton>
        </PlayButtonWrapperInside>
      </PlayButtonWrapper>
    </CustomStackFullWidthVideo>
  );
};

export default CustomVideoPlayer;

// import React from "react";

// import ReactPlayer from "react-player";
// import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";

// const InstructionVideo = () => {
//   return (
//     <CustomStackFullWidth>
//       <CustomStackFullWidth
//         mt={{ xs: ".5rem", sm: "1.5rem", md: "2rem" }}
//         p=".5rem"
//         sx={{ maxWidth: "615px", maxHeight: "351px", height: "100%" }}
//       >
//         {/* <ReactPlayer
//           url="https://www.youtube.com/watch?v=-gSOyS4ynQo&t=6s"
//           height="100%"
//           width="100%"
//           controls={false}
//         /> */}
//         <ReactPlayer
//           url="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"
//           // url="https://www.youtube.com/embed/-gSOyS4ynQo?si=FsS25EJEYd7_HUza"
//           width="100%"
//           height="100%"
//           controls
//           style={{ border: '1px solid #ccc' }}
//           config={{
//             file: {
//               attributes: {
//                 controlsList: 'nodownload', // Disable download button
//               },
//             },
//           }}
//         />
//       </CustomStackFullWidth>
//     </CustomStackFullWidth>
//   );
// };

// export default InstructionVideo;

