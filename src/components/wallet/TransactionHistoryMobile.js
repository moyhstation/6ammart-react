import { useTheme } from "@emotion/react";
import { MenuItem, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { data_limit } from "../../api-manage/ApiRoutes";
import { getAmountWithSign } from "../../helper-functions/CardHelpers";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import DotSpin from "../DotSpin";
import CustomEmptyResult from "../custom-empty-result";
import nodataimage from "../loyalty-points/assets/Search.svg";
import { CustomSelect, transaction_options } from "../transaction-history";
import TransactionShimmer from "../transaction-history/Shimmer";

const TransactionHistoryMobile = ({
  data,
  isLoading,
  page,
  value,
  setValue,
  offset,
  setOffset,
  isFetching,
}) => {
  const [trxData, setTrxData] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      if (offset <= 1) {
        setTrxData(data?.data);
      } else {
        setTrxData([...trxData, ...data?.data]);
      }
    }
  }, [data]);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (!isLoading) {
        if (offset * data_limit <= data?.total_size) {
          setOffset((prevState) => prevState + 1);
        }
      }
    }
  }, [inView]);

  const { t } = useTranslation();

  const handleChange = (e) => {
    setValue(e.target.value);
    setOffset(1);
  };
  const theme = useTheme();
  return (
    <CustomStackFullWidth>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mt={2}
        mb={2}
      >
        <Typography fontSize="14px" fontWeight="700" py="1rem">
          {t("Transaction History")}
        </Typography>
        {page != "loyalty" && (
          <CustomSelect value={value} onChange={(e) => handleChange(e)}>
            {transaction_options?.map((item, i) => (
              <MenuItem key={i} value={item?.value}>
                {item?.label}
              </MenuItem>
            ))}
          </CustomSelect>
        )}
      </Stack>
      {trxData?.length > 0 &&
        trxData?.map((item) => {
          return (
            <Stack
              key={item?.id}
              spacing={1.8}
              padding="14px 11px"
              backgroundColor={theme.palette.neutral[300]}
              borderRadius="10px"
              marginBottom="10px"
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  color={
                    item?.debit
                      ? (theme) => theme.palette.error.main
                      : (theme) => theme.palette.primary.main
                  }
                  fontWeight="500"
                  fontSize="12px"
                >
                  {page === "loyalty"
                    ? item?.transaction_type === "point_to_wallet"
                      ? item?.debit
                      : item?.credit
                    : getAmountWithSign(
                        item?.transaction_type === "point_to_wallet"
                          ? item?.debit
                          : item?.credit + item?.admin_bonus
                      )}
                </Typography>
                <Typography fontSize="11px" color={theme.palette.neutral[400]}>
                  {item?.created_at}
                </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                {item?.transaction_type === "add_fund" ? (
                  <Typography fontSize="12px">
                    {t("added via")}
                    {t(item?.reference).replaceAll("_", " ")} ({t("bonus")}:
                    {getAmountWithSign(item?.admin_bonus)})
                  </Typography>
                ) : (
                  <Typography fontSize="12px">
                    {t(item?.transaction_type).replaceAll("_", " ")}
                  </Typography>
                )}
                <Typography
                  fontSize="10px"
                  color={
                    item?.transaction_type === "order_place"
                      ? theme.palette.error.main
                      : theme.palette.primary.main
                  }
                >
                  {" "}
                  {item?.transaction_type === "order_place"
                    ? t("debit")
                    : t("credit")}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      {!isLoading && isFetching && (
        <Stack sx={{ marginTop: "2rem" }}>
          <DotSpin />
        </Stack>
      )}
      <Box ref={ref} sx={{ height: "5px" }} />

      {trxData?.length == 0 && (
        <CustomEmptyResult
          image={nodataimage}
          width="128px"
          height="128px"
          label="No transaction found"
        />
      )}
      {isLoading && <TransactionShimmer />}
    </CustomStackFullWidth>
  );
};

export default TransactionHistoryMobile;
