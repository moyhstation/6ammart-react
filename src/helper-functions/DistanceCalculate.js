import { useSelector } from "react-redux";
import { t } from "i18next";

export const DistanceCalculate = ({ distance }) => {
  const { configData } = useSelector((state) => state.configData);
  const distanceValue = (distance / 1000).toFixed(
    configData?.digit_after_decimal_point
  );

  const getDistance = () => {
    if (Number.parseInt(distanceValue) > 1000) {
      return t("1k+ km");
    } else {
      return `${(distance / 1000).toFixed(
        configData?.digit_after_decimal_point
      )}km `;
    }
  };

  return distance ? getDistance() : "0 km";
};
