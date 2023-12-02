import { useSelector } from "react-redux";
import moment from "moment";

const CustomTimeFormat = ({ time }) => {
  const { configData } = useSelector((state) => state.configData);
  let timeFormat = configData?.timeformat;
  const myMoment = moment(time, "HH:mm:ss");

  if (timeFormat === "12") {
    return myMoment.format("hh:mm a");
  } else {
    return myMoment.format("HH:mm");
  }
};

export default CustomTimeFormat;
