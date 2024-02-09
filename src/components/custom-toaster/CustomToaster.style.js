import { Paper, styled } from "@mui/material";

export const CustomPaperRefer = styled(Paper)(({ theme }) => ({
     display:"flex",
     alignItems:"center",
     padding:"17px 28px 22px 28px", 
     borderRadius: "12px",
     gap:"18px"
    })
  );