import { Stack, alpha, styled } from "@mui/material";
import { CustomStackFullWidth } from "../../../styled-components/CustomStyles.style";

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { display } from "@mui/system";


export const CustomStackFullWidthVideo = styled(CustomStackFullWidth)(
    ({ }) => ({
      position: "relative",
        maxWidth: "615px", 
        width: "100%",
        paddingTop: "25px",
    })
  );

export const PlayButtonWrapper = styled(Stack)(({ theme, showControls, showIcon }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    backgroundColor: alpha(theme.palette.primary.main, .7),
    padding: "45px",
    borderRadius: '100%',
    display: showIcon ? "inline" : "none",
  }));
export const PlayButtonWrapperInside = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100%'
  }));

export const PlayButton = styled(PlayCircleIcon)(({ theme }) => ({
    fontSize: "50px",
    color: theme.palette.whiteContainer.main,
  }));
export const PauseButton = styled(PauseCircleIcon)(({ theme }) => ({
    fontSize: "50px",
    color: theme.palette.whiteContainer.main,
  }));
