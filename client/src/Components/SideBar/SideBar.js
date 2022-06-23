import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import common from "@mui/material/colors/common";
import bugReport from "../../Assets/bug-report.png";
import bugLoop from "../../Assets/bug-loop.png";
import bugDashboard from "../../Assets/bug-dashboard.png";
import users_icon from "../../Assets/users_icon.png";

const drawerWidth = "250px";



const DrawerElement = ({ setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const clickedOptions = () => {
    setCurrentId(null);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: "auto",
          p: "0px 12px",
        }}
      >
        <Divider />
        <List>
          <ListItem>
            <Typography variant="h6">
              Welcome, {user.result.userName}
            </Typography>
          </ListItem>
        </List>

        <Divider />

        <List sx={{ padding: 0 }}>
          <Link to="/" className="side-link" onClick={clickedOptions}>
            <ListItemButton
              sx={{
                p: "10px 16px",
                m: "28px 0 4px 0",
                fontSize: "medium",
                borderRadius: "0.5rem"
              }}
            >
              <img
                src={bugDashboard}
                alt="Bug-dashboard"
                style={{ width: "24px", marginRight: "1rem" }}
              />
              Dashboard
            </ListItemButton>
          </Link>

          {user.result.role === "admin" && (
            <Link
              to="/usersManagement"
              className="side-link"
              onClick={clickedOptions}
            >
              <ListItemButton
                sx={{
                  p: "10px 16px",
                  mb: "4px",
                  fontSize: "medium",
                  borderRadius: "0.5rem",
                }}
              >
                <img
                  src={users_icon}
                  alt="Users-tab"
                  style={{ width: "24px", marginRight: "1rem" }}
                />
                Users
              </ListItemButton>
            </Link>
          )}

          <Link to="/viewBugs" className="side-link" onClick={clickedOptions}>
            <ListItemButton
              sx={{
                p: "10px 16px",
                mb: "4px",
                fontSize: "medium",
                borderRadius: "0.5rem",
              }}
            >
              <img
                src={bugLoop}
                alt="Bug-loop"
                style={{ width: "24px", marginRight: "1rem" }}
              />
              Bugs
            </ListItemButton>
          </Link>
          {(user.result.role === "admin" || user.result.role === "tester") && (
            <Link
              to="/createBugIssue"
              className="side-link"
              onClick={clickedOptions}
            >
              <ListItemButton
                sx={{
                  p: "10px 16px",
                  mb: "4px",
                  fontSize: "medium",
                  borderRadius: "0.5rem",
                }}
              >
                <img
                  src={bugReport}
                  alt="Bug-report"
                  style={{ width: "24px", marginRight: "1rem" }}
                />
                New Bug
              </ListItemButton>
            </Link>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

const SideBar = ({ setCurrentId, window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <BugReportIcon
        fontSize="large"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        sx={{
          // marginLeft: "1rem",
          // marginTop: "1rem",
          display: { lg: "none" },
          zIndex: (theme) => theme.zIndex.drawer + 2,
          cursor: "pointer",
          color: common.white,
          position: "fixed",
          top: "11px",
          left: "16px",
        }}
      ></BugReportIcon>
      <Box
        component="nav"
        sx={{ width: { xs: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              // width: "185px",
            },
          }}
        >
          <DrawerElement setCurrentId={setCurrentId} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerElement setCurrentId={setCurrentId} />
        </Drawer>
      </Box>
    </>
  );
};

export default SideBar;
