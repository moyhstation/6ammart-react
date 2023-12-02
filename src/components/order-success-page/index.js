import React, { useEffect, useState } from "react";
import { CustomPaperBigCard } from "../../styled-components/CustomStyles.style";
import { Stack } from "@mui/system";
import SuccessCard from "../checkout/SuccessCard";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import CheckoutFailed from "../checkout/CheckoutFailed";
import jwt from "base-64";

const OrderSuccessPage = ({ configData }) => {
  const router = useRouter();
  const { status, totalAmount, order_id, token, flag } = router.query;
  const { t } = useTranslation();
  const { total } = router.query;
  const [attributeId, setAttributeId] = useState("");

  useEffect(() => {
    if (token) {
      try {
        // Attempt to decode the Base64 token
        const decodedToken = jwt.decode(token);

        // Check if decodedToken is a valid string
        if (typeof decodedToken === "string") {
          // Assuming decodedToken is in the format: "key1=value1&&key2=value2&&..."
          const keyValuePairs = decodedToken.split("&&");

          // Loop through the key-value pairs to find the one with attribute_id
          for (const pair of keyValuePairs) {
            const [key, value] = pair.split("=");
            if (key === "attribute_id") {
              setAttributeId(value);
              return; // Exit the loop when attribute_id is found
            }
          }
        } else {
          console.error("Decoded token is not a string:", decodedToken);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token is missing.");
    }
  }, [token]);
  return (
    <>
      {router.isReady && (
        <Stack
          width="100%"
          height="100%"
          mb="3rem"
          alignItems="center"
          justifyContent="center"
          mt="1rem"
        >
          <CustomPaperBigCard>
            {(flag && flag === "fail") || flag === "cancel" ? (
              <CheckoutFailed
                id={order_id ? order_id : attributeId}
                configData={configData}
              />
            ) : (
              <SuccessCard
                configData={configData}
                total={total}
                order_id={order_id ? order_id : attributeId}
              />
            )}
          </CustomPaperBigCard>
        </Stack>
      )}
    </>
  );
};

export default OrderSuccessPage;
