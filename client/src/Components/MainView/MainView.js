import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getBugs } from "../../Redux/actions/bugsActions";
import { getUsers, getDevs } from "../../Redux/actions/usersActions";

import { Box, Toolbar } from "@mui/material";

import ViewBugs from "../../Pages/ViewBugs";
import BugIssueForm from "../../Pages/BugIssueForm";
import Dashboard from "../../Pages/Dashboard";
import SideBar from "../SideBar/SideBar";
import UsersManagement from "../../Pages/UsersManagement";
import UserCreateUpdate from "../UsersComps/UserCreateUpdate";

const MainView = () => {
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getBugs());
  //   dispatch(getDevs());
  //   dispatch(getUsers());
  // }, [dispatch, currentId]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar setCurrentId={setCurrentId} style={{ position: "relative" }} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // p: "1rem",
            mt: "1rem",
            // width: { sm: '80%', xs: "150%" },
            width: {xs: '100%', lg: '80%'}, position: {xs: 'absolute', lg: 'static'}
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {user.result.role === "admin" && (
              <Route path="/usersManagement" element={<UsersManagement currentId={currentId} setCurrentId={setCurrentId}/>} />
            )}
            {user.result.role === "admin" && (
              <Route path="/usersManagement/addUser" element={<UserCreateUpdate currentId={currentId} setCurrentId={setCurrentId}/>} />
            )}
            {(user.result.role === "admin" || user.result.role === "tester") && (
              <Route path="/createBugIssue" element={<BugIssueForm currentId={currentId} setCurrentId={setCurrentId}/>} />
            )}
            <Route path="/viewBugs" element={<ViewBugs setCurrentId={setCurrentId} />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default MainView;
