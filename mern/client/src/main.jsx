import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Agent from "./components/Agent";
import AgentList from "./components/AgentList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <AgentList />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Agent />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Agent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

//////////////////////////////////

// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import App from "./App";
// import Login from "./components/Login";
// import Agent from "./components/Agent";
// import AgentList from "./components/AgentList";
// import "./index.css";

// // You can implement your authentication logic here,
// // for example, using a state to track the authentication status.
// const isAuthenticated = false; // Change this to true once the user is authenticated

// // Define a custom route component to handle conditional routing
// const CustomRoute = ({ path, element }) => {
//   if (isAuthenticated && path === "/") {
//     return <Navigate to="/home" replace />;
//   } else if (!isAuthenticated && path !== "/") {
//     return <Navigate to="/" replace />;
//   } else {
//     return <Route path={path} element={element} />;
//   }
// };

// const router = createBrowserRouter(
//   <Routes>
//     <CustomRoute path="/" element={<Login />} />
//     <CustomRoute path="/home" element={<App />}>
//       <Route path="/" element={<AgentList />} />
//     </CustomRoute>
//     <CustomRoute path="/create" element={<App />}>
//       <Route path="/" element={<Agent />} />
//     </CustomRoute>
//     <CustomRoute path="/edit/:id" element={<App />}>
//       <Route path="/" element={<Agent />} />
//     </CustomRoute>
//   </Routes>
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
