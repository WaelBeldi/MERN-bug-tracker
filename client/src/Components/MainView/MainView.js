import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getBugs } from "../../Redux/actions/bugsActions";
import { getDevs } from "../../Redux/actions/authActions";

import { Box, Toolbar } from "@mui/material";

import ViewBugs from "../../Pages/ViewBugs";
import BugForm from "../../Pages/BugIssueForm";
import Dashboard from "../../Pages/Dashboard";
import SideBar from "../SideBar/SideBar";

const MainView = () => {
  const [currentId, setCurrentId] = useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBugs());
    dispatch(getDevs());
  }, [dispatch, currentId]);

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
            width: {sm: '80%', xs: '97%'}, position: {xs: 'absolute', sm: 'static'}
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/viewBugs" element={<ViewBugs setCurrentId={setCurrentId} />} />
            {user.result.role === "admin" && (
              <Route path="/createBugIssue" element={<BugForm currentId={currentId} setCurrentId={setCurrentId}/>} />
            )}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default MainView;
