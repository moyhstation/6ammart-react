import { CustomBoxFullWidth } from "../../styled-components/CustomStyles.style";
import WidgetShimmer from "./WidgetShimmer";
import CustomShimmerForForm from "./FormShimmer";

const CustomShimmerForProfile = () => {
  return (
    <CustomBoxFullWidth mt="20px">
      <WidgetShimmer />
      <CustomShimmerForForm />
    </CustomBoxFullWidth>
  );
};

export default CustomShimmerForProfile;
