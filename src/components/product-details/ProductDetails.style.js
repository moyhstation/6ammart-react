import { Box, styled } from "@mui/material";
import { Stack } from "@mui/system";

export const CustomColorBox = styled(Stack)(
  ({ theme, color, productcolor }) => ({
    width: "35px",
    height: "35px",
    backgroundColor: color,
    borderRadius: "2px",
    cursor: "pointer",
    //border: color === productcolor && `2px solid ${theme.palette.primary.main}`,
    margin: "4px",
    justifyContent: "center",
    alignItems: "center",
  })
);
export const CustomSizeBox = styled(Stack)(({ theme, productsize, size }) => ({
  justifyContent: "center",
  alignItems: "center",
  padding: " 8px 15px",
  border: "1px solid ",
  borderColor: theme.palette.primary.main,
  borderRadius: "2px",
  cursor: "pointer",
  backgroundColor: productsize === size && theme.palette.primary.main,
  color:
    productsize === size
      ? theme.palette.neutral[100]
      : theme.palette.neutral[1000],
  [theme.breakpoints.down("md")]: {
    padding: " 8px 6px",
  },
}));
