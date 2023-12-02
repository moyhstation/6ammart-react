import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const initialSettings = {
  direction: "ltr",
  responsiveFontSizes: true,
  theme: "light",
};

// window.matchMedia('(prefers-color-scheme: dark)').matches
//     ? 'dark'
//     : 'light'
export const restoreSettings = () => {
  let settings = null;

  try {
    const storedData = window.localStorage.getItem("settings");
    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = {
        direction: "ltr",
        responsiveFontSizes: true,
        theme: "light",
      };
    }
  } catch (err) {
    // If stored data is not a stringified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};
export const storeSettings = (settings) => {
  window.localStorage.setItem("settings", JSON.stringify(settings));
};
export const SettingsContext = createContext({
  settings: initialSettings,
  saveSettings: () => {},
});
export const SettingsProvider = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const restoredSettings = restoreSettings();
    if (restoredSettings) {
      setSettings(restoredSettings);
    }
  }, []);

  const saveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
    storeSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const SettingsConsumer = SettingsContext.Consumer;
