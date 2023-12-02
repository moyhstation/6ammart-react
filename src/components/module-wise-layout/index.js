import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import ModuleSelect from "../module-select/ModuleSelect";
import HomePageComponents from "../home/HomePageComponents";
import PercelComponents from "../parcel";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedModule } from "../../redux/slices/utils";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mui/material";
import useGetModule from "../../api-manage/hooks/react-query/useGetModule";
import { setResetStoredData } from "../../redux/slices/storedData";
import { setModules } from "../../redux/slices/configData";

const ModuleWiseLayout = ({ configData }) => {
  const [rerender, setRerender] = useState(false);
  const { selectedModule } = useSelector((state) => state.utilsData);
  const { data, refetch } = useGetModule();
  const dispatch = useDispatch();
  const router = useRouter();
  const { modules } = useSelector((state) => state.storedData);
  
  useEffect(() => {
    if (router.pathname === "/home") {
      refetch();
    }
  }, []);
  useEffect(() => {
    if (data?.length > 0) {
      dispatch(setModules(data));
    }
  }, [data]);
  useEffect(() => {
    handleModuleSelect();
  }, [selectedModule]);
  const handleModuleSelect = () => {
    dispatch(setResetStoredData());
    setRerender((prevState) => !prevState);
  };
  const isSmall = useMediaQuery("(max-width:1180px)");
  const moduleSelectHandler = async (item) => {
    if (router.query.search) {
      await router.replace("/home");
    }
    localStorage.setItem("module", JSON.stringify(item));
    if (item?.module_type === "parcel") {
      dispatch(setSelectedModule(item));
    } else {
      dispatch(setSelectedModule(item));
    }
  };

  return (
    <CustomStackFullWidth>
      {!isSmall && data && data?.length > 1 && !router.query.search && (
        <ModuleSelect
          moduleSelectHandler={moduleSelectHandler}
          selectedModule={selectedModule}
          data={data}
          configData={configData}
          dispatch={dispatch}
        />
      )}
      <HomePageComponents key={rerender} configData={configData} />
    </CustomStackFullWidth>
  );
};

export default React.memo(ModuleWiseLayout);
