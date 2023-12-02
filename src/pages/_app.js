import "../src/styles/globals.css";
import "../src/styles/nprogress.css";
import {CacheProvider} from "@emotion/react";
import {Provider as ReduxProvider} from "react-redux";
import {createEmotionCache} from "../src/utils/create-emotion-cache";
import {store} from "../src/redux/store";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "../src/theme";
import CssBaseline from "@mui/material/CssBaseline";
import {RTL} from "../src/components/rtl";
import {Toaster} from "react-hot-toast";

import {SettingsConsumer, SettingsProvider,} from "../src/contexts/settings-context";
import "../src/language/i18n";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import nProgress from "nprogress";
import Router, {useRouter} from "next/router";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const getLayout = Component.getLayout ?? ((page) => page);
    const queryClient = new QueryClient();
    const router = useRouter();
    //storing persisted data
    const persist = persistStore(store);

    return (
        <>
            <CacheProvider value={emotionCache}>
                <QueryClientProvider client={queryClient}>
                    <ReduxProvider store={store}>
                        <PersistGate loading={null} persistor={persist}>
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
                                                {getLayout(<Component {...pageProps} />)}
                                            </RTL>
                                        </ThemeProvider>
                                    )}
                                </SettingsConsumer>
                            </SettingsProvider>
                        </PersistGate>
                    </ReduxProvider>
                    <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
                </QueryClientProvider>
            </CacheProvider>
        </>
    );
}

export default MyApp;
