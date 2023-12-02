export const getModuleId = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem("module"))?.id;
  }
};
