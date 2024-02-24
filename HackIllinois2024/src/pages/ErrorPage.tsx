import { useRouteError } from "react-router-dom";
import React from "react"; // Import React (optional based on your setup)

// Define a type for the error object
type RouteError = {
  message?: string;
  statusText?: string;
};

const ErrorPage: React.FC = () => {
  const error = useRouteError() as RouteError; // Cast the error to the RouteError type
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
