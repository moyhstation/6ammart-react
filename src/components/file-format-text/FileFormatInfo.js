import React from "react";

import Typography from "@mui/material/Typography";
import { CustomBoxImageText } from "../file-previewer/FilePreviewer.style";

const FileFormatInfo = (props) => {
  const { text } = props;
  return (
    <CustomBoxImageText>
      <Typography>{text}</Typography>
    </CustomBoxImageText>
  );
};

FileFormatInfo.propTypes = {};

export default FileFormatInfo;
