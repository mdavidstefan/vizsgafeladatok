import React from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./Home";
import { Properties } from "./Properties";
import { AddNew } from "./AddNew";
import { Property } from "./Property";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/properties", element: <Properties /> },
  { path: "/property/:id", element: <Property /> },
  { path: "/addnew", element: <AddNew /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
