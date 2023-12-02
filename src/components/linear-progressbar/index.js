import React from "react";
import PropTypes from "prop-types";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
const BorderLinearProgress = styled(LinearProgress)(({ theme, height }) => ({
  height: height ? height : 8,
  borderRadius: 5,
}));
const CustomLinearProgressbar = ({value,height}) => {
  return <BorderLinearProgress variant="determinate" value={value} height={height}/>;
};

CustomLinearProgressbar.propTypes = {};

export default CustomLinearProgressbar;
