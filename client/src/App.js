import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomeLayout from "./components/HomeLayout";
import { Carousel } from "./components/HomeLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import swal from "sweetalert";

function App() {
  const [user, setUser] = useState({});
  // add token to all api request headers
  axios.interceptors.request.use(async function (config) {
    const token = await localStorage.getItem("access-token");
    config.headers["x-access-token"] = token;
    return config;
  });

  useEffect(() => {
    const localState = localStorage.getItem("user-state");
    if (localState) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/user`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
          swal("Server Error",{icon: "error"});
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout user={user} setUser={setUser} />}>
          <Route index element={<Carousel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/tasks"
          element={<Tasks user={user} setUser={setUser} />}
        />
        <Route
          path="*"
          element={<HomeLayout user={user} setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
