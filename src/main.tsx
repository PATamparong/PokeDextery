import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider, ThemeProvider } from "./provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SearchProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </SearchProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
