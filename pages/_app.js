import "../src/styles/globals.css";
import "../src/styles/nprogress.css";
import {CacheProvider} from "@emotion/react";
import {Provider as ReduxProvider} from "react-redux";
import createEmotionCache from "../src/utils/create-emotion-cache";
import {store} from "../src/redux/store";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../src/theme";

import CssBaseline from "@mui/material/CssBaseline";
import {RTL} from "../src/components/rtl";
import {Toaster} from "react-hot-toast";
import { getServerSideProps } from "./index";
import {SettingsConsumer, SettingsProvider,} from "../src/contexts/settings-context";
import "../src/language/i18n";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import nProgress from "nprogress";
import Router from "next/router";
import {persistStore} from "redux-persist";
import DynamicFavicon from "../src/components/favicon/DynamicFavicon";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import {PersistGate} from "redux-persist/integration/react";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
const clientSideEmotionCache = createEmotionCache();
function MyApp(props) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps,configData} = props;
    const getLayout = Component.getLayout ?? ((page) => page);
    const {t} = useTranslation()
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 60 * 5, // 5 minutes
                staleTime: 1000 * 60 * 2, // 2 minutes
            },
        },
    });
    //storing persisted data
    let persistor = persistStore(store);

    return (
        <>
            <CacheProvider value={emotionCache}>
                <QueryClientProvider client={queryClient}>
                    <ReduxProvider store={store}>
                      {/*<PersistGate loading={null} persistor={persistor}>*/}
                        <SettingsProvider>
                            <SettingsConsumer>
                                {(value) => (
                                    <ThemeProvider
                                        theme={createTheme({
                                            direction: value?.settings?.direction,
                                            responsiveFontSizes: value?.settings?.responsiveFontSizes,
                                            mode: value?.settings?.theme,
                                        })}
                                    >
                                        <RTL direction={value?.settings?.direction}>
                                            <CssBaseline/>
                                            <Toaster position="top-center"/>
                                            {/* <DynamicFavicon configData={configData}/> */}
                                            {/* <Head>
                                                <title>{t('Loading...')}</title>
                                            </Head> */}
                                            {getLayout(<Component {...pageProps} />)}
                                        </RTL>
                                    </ThemeProvider>
                                )}
                            </SettingsConsumer>
                        </SettingsProvider>
                      {/*</PersistGate>*/}
                    </ReduxProvider>
                    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
                </QueryClientProvider>
            </CacheProvider>
        </>
    );
}

export default MyApp;
export { getServerSideProps };