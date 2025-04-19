import { useRouteError } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.statusText || "An error occurred."}</p>
    </div>
  );
}

export default NotFound;