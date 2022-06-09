import React from "react";
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

const drawerWidth = "20%";

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
      <Box sx={{ overflow: "auto" }}>
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
            <ListItemButton divider>
              <img
                src={bugDashboard}
                alt="Bug-dashboard"
                style={{ width: "24px", marginRight: "5px" }}
              />
              DashBoard
            </ListItemButton>
          </Link>
          {user.result.role === "admin" && (
            <Link
              to="/createBugIssue"
              className="side-link"
              onClick={clickedOptions}
            >
              <ListItemButton divider>
                <img
                  src={bugReport}
                  alt="Bug-report"
                  style={{ width: "24px", marginRight: "5px" }}
                />
                Create Bug Issue
              </ListItemButton>
            </Link>
          )}
          <Link to="/viewBugs" className="side-link" onClick={clickedOptions}>
            <ListItemButton divider>
              <img src={bugLoop} alt="Bug-loop" style={{ width: "24px", marginRight: "5px" }} />
              View Bugs
            </ListItemButton>
          </Link>
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
          display: { sm: "none" },
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "200px",
            },
          }}
        >
          <DrawerElement setCurrentId={setCurrentId} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
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
