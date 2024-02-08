/* eslint-disable react-hooks/exhaustive-deps */
import {Tab, Tabs} from "@mui/material";
import {Stack} from "@mui/system";
import {t} from "i18next";
import React, {useEffect} from "react";

export const data = [
  {
    id: 1,
    userType: "Seller",
    value: "vendor",
  },
  {
    id: 2,
    userType: "Delivery Man",
    value: "delivery_man",
  },
];

const ChatUserTab = ({
  setUserType,
  userType,
  setChannelId,
  handleReset,
  setResetState,
}) => {
  //const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setUserType(data[0]?.value);
  }, []);

  const handleChange = (event, newValue) => {
    setUserType(newValue);
    setChannelId(null);
    setResetState(false);
    handleReset();
  };

  return (
    <Stack width="100%" sx={{ paddingInlineEnd: "6px" }}>
      <Tabs
        indicatorColor="primary"
        value={userType}
        onChange={handleChange}
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        sx={{
          "& .MuiButtonBase-root": {
            paddingInlineEnd: "10px",
            paddingInlineStart: "0px",
          },
          "& .MuiTabs-flexContainer": {
            gap: "5px",
          },
          "& .MuiTabs-indicator": {
            height: "4px",
            width: "13% !important",
            borderRadius: "5px",
            //left: "10px !important",
            // right: "unset",
          },
        }}
      >
        {data?.map((item) => (
          <Tab value={item?.value} label={t(item.userType)} key={item?.id} />
        ))}
      </Tabs>
    </Stack>
  );
};

export default ChatUserTab;
