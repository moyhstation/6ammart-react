export const getCurrentModuleType = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem("module"))?.module_type;
  }
};

export const getCurrentModuleId = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem("module"))?.id;
  }
};
