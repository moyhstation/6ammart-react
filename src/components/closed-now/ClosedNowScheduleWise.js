import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { isAvailable } from "../../utils/CustomFunctions";
import ClosedNowOverlay from "./ClosedNowOverlay";

const ClosedNowScheduleWise = (props) => {
  const { active, schedules, borderRadius } = props;
  if (active) {
    if (schedules.length > 0) {
      const todayInNumber = moment().weekday();
      let isOpen = false;
      let filteredSchedules = schedules.filter(
        (item) => item.day === todayInNumber
      );
      let isAvailableNow = [];
      filteredSchedules.forEach((item) => {
        if (isAvailable(item?.opening_time, item?.closing_time)) {
          isAvailableNow.push(item);
        }
      });
      if (isAvailableNow.length > 0) {
        isOpen = true;
      } else {
        isOpen = false;
      }
      if (!isOpen) {
        return <ClosedNowOverlay borderRadius={borderRadius} />;
      }
    } else {
      return <ClosedNowOverlay borderRadius={borderRadius} />;
    }
  } else {
    return <ClosedNowOverlay borderRadius={borderRadius} />;
  }
};

ClosedNowScheduleWise.propTypes = {};

export default ClosedNowScheduleWise;
