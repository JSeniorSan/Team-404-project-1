import React from "react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../shared/api/index";
export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<h1>Loading...</h1>}>{component()}</Suspense>
      </Provider>
    </BrowserRouter>
  );
