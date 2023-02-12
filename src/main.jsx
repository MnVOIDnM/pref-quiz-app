import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ChakraProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ChakraProvider>
  // </React.StrictMode>
);
