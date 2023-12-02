import { useRouter } from "next/router";
import { styled } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";

export const Logo = styled("div")(({ theme, height, width }) => ({
  width: width,
  height: height,
  justifyContent: "center",

  position: "relative",
  cursor: "pointer",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contained",
  },
}));
const CustomLogo = ({ logoImg, atlText, height, width, objectFit }) => {
  const router = useRouter();
  let location = undefined;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
  }
  const handleClick = () => {
    if (router.pathname === "/") {
      if (location) {
        router.replace("/home", undefined, { shallow: true });
      } else {
        router.push("/", undefined, { shallow: true });
      }
    } else {
      router.replace("/home", undefined, { shallow: true }).then();
    }
  };
  return (
    <Logo height={height} width={width} onClick={() => handleClick()}>
      <CustomImageContainer
        src={logoImg}
        alt={atlText}
        objectfit={objectFit ? objectFit : "contain"}
      />
    </Logo>
  );
};
export default CustomLogo;
