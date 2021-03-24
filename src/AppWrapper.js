import { D2Shim } from "@dhis2/app-runtime-adapter-d2";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./components/App";
import { D2Context } from "./Context";

import "antd/dist/antd.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const d2Config = {};
const theme = extendTheme({

});

const AppWrapper = () => (
  <D2Shim d2Config={d2Config} i18nRoot="./i18n">
    {({ d2, d2Error }) => {
      if (d2Error) {
        return <div>{d2Error.message}</div>;
      }
      if (!d2) {
        return <div>Loading</div>;
      }

      return (
        <QueryClientProvider client={queryClient}>
          <D2Context.Provider value={d2}>
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
          </D2Context.Provider>
        </QueryClientProvider>
      );
    }}
  </D2Shim>
);

export default AppWrapper;
