import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import { common } from "@mui/material/colors";

const NavBar = ({setUser}) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/');
    setUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <BugReportIcon
          fontSize="large"
          sx={{ marginRight: "1rem", visibility: { xs: "hidden", sm: "visible" } }}
        ></BugReportIcon>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, fontSize: "150%", color: "primary.text" }}
        >
        <Link to="/" className="link">
          Bagbouga
        </Link>
          <Typography
            sx={{
              color: "secondary.text",
              fontSize: "40%",
              verticalAlign: "top",
              letterSpacing: "0.16em",
              fontWeight: "bolder",
            }}
            variant="inline"
          >
            &nbsp;{!user ? "" : user.result.role === "admin" ? "ADMIN" : "DEV"}
          </Typography>
        </Typography>
        {user && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
