import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import CloseIcon from "@mui/icons-material/Close";
import { CustomPaperRefer } from './CustomToaster.style';
import { useEffect } from 'react';

const CustomToast = ({ title, description, icon }) => (
  <CustomPaperRefer>
    {icon && (icon)}
    <Stack gap="7px">
      <Typography fontSize="14px" fontWeight={700} sx={{ color: 'primary.main' }}>
        {title}
      </Typography>
      <Typography fontSize="12px" sx={{ width: "100%", maxWidth: "283px" }}>{description}</Typography>
    </Stack>
    <IconButton sx={{ position: 'absolute', top: 10, right: 15 }} onClick={() => toast.dismiss()}>
      <CloseIcon sx={{ fontSize: "16px" }} />
    </IconButton>
  </CustomPaperRefer>
);

// Function to show the custom toast
const showToast = ({ title, description, icon, position }) => {
  toast.custom((t) => <CustomToast title={title} description={description} icon={icon} />, {
    position: position,
    duration: 5000,
  });
};

// Usage example
const CustomToaster = (props) => {
  const { title, description, icon, position, isOpen } = props;
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (isOpen) {
      handleShowToast();
    }
  }, [isOpen])

  const handleShowToast = () => {
    showToast({
      title: title,
      description: description,
      icon: icon,
      position: position,
    });
  };
  return (
    <Toaster />
  )
}

export default CustomToaster;


{/* <CustomToaster
  title="Someone just used  your code !"
  description="Be prepare to receive when they complete there first purchase"
  icon={<CongratulationsIcon />}
  position="top-right"
/> */}

// Positions		
// "top-left"
// "top-center"
// "top-right"

// "bottom-left"
// "bottom-center"
// "bottom-right"