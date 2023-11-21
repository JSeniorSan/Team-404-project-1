import React from "react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "shared/api/index";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={null}>
            <Suspense fallback={<h1>Loading...</h1>}>{component()}</Suspense>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  );
