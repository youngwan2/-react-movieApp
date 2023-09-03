import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Movies from "../pages/Movies";
import NotPath from "../components/error/NotPath";
import Detail from "../pages/Detail";
import Header from "../components/header/Header";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotPath />,
    errorElement: <h1>Sorry, Not Found Page!..</h1>,
  },
  {
    path: "/movieapp",
    element: (
      <>
        <Header />
        <App />
      </>
    ),
    errorElement: <h1>Sorry, Not Found Page!..</h1>,
  },
  {
    path: "/movieapp/movies",
    element: (
      <>
        <Header />
        <Movies />
      </>
    ),
  },
  {
    path: "/movieapp/detail/:id",
    element: (
      <>
        <Header />
        <Detail />
      </>
    ),
  },
]);

export default router;
