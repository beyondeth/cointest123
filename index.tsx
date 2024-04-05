import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStyle } from "./App";
import { Fragment } from "react/jsx-runtime";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Fragment>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </Fragment>
);
