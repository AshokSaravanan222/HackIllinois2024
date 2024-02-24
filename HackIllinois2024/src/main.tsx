import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorPage from "./pages/ErrorPage";
import Root from "./routes/root";
import OutfitPage from "./pages/OutfitPage"; // Make sure this path is correct

import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "outfit/:outfitId",
    element: <OutfitPage />, // Corrected the component name
  },
]);

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App router={router} /> {/* Pass the router prop to App */}
    </ConvexProvider>
  </React.StrictMode>
);
