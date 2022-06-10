import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PriorityColors from "./PriorityColors";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteBug,
  resolveBug,
  devRespond,
} from "../../Redux/actions/bugsActions";
import MDEditor from "@uiw/react-md-editor";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BugCardTwo(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const {_id, title, version, name, createdOn, isResolved, assigned, devResponse, details, priority } = props.bug;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateDevResponse, setStateDevResponse] = useState("");
  const [stateEditResponse, setStateEditResponse] = useState(
    props.bug.devResponse
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const priorityTheme = props.bug.isResolved
    ? 3 + parseInt(props.bug.priority)
    : props.bug.priority;
  const { level, BGcolor } = PriorityColors(priorityTheme);
  const Clicked = () => {
    props.clicked(props.bug._id, priorityTheme);
  };

  const editClicked = () => {
    props.setCurrentId(props.bug._id);
    navigate("/createBugIssue");
  };
  const deleteClicked = () => {
    dispatch(deleteBug(props.bug._id));
  };
  const resolveClicked = () => {
    dispatch(resolveBug(props.bug._id));
    const priorityTheme = !props.bug.isResolved
      ? 3 + parseInt(props.bug.priority)
      : props.bug.priority;
    PriorityColors(priorityTheme);
  };
  const handleResponse = (e) => {
    setStateDevResponse(e.target.value);
  };
  const submitResponse = (e) => {
    e.preventDefault();
    dispatch(
      devRespond(
        props.bug._id,
        { devResponse: stateDevResponse },
        editDevResponse
      )
    );
    editDevResponse();
  };
  const editDevResponse = () => {
    setStateEditResponse(!stateEditResponse);
  };

  return (
    <Card elevation={3} sx={{ width: "98%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: BGcolor }}>
            {level === "High" ? "H" : level === "Moderate" ? "M" : "L"}
          </Avatar>
        }
        title={
          <Typography variant="h6" color="text.primary">
            {level}
            <Typography variant="inline" sx={{ float: "right" }}>
              {props.bug.isResolved ? "RESOLVED" : "ACTIVE"}
            </Typography>
          </Typography>
        }
        // subheader="September 14, 2016"
        sx={{ p: "0.5rem 1rem", bgcolor: BGcolor }}
      />
      <CardContent sx={{ p: "0.5rem 1rem" }}>
        <Typography variant="h6" color="text.primary">
          {props.bug.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h5" color="primary.main" sx={{ mt: 1 }}>
            Details
          </Typography>
          <MDEditor.Markdown source={props.bug.details} />
          {((user.result.role === "admin" && props.bug.devResponse) ||
            (user.result.userName === props.bug.assigned &&
              stateEditResponse)) && (
            <Typography
              variant="h5"
              color="primary.main"
              sx={{ mt: 1 }}
              align="right"
            >
              Developer Response
            </Typography>
          )}
          {user.result.role === "admin" && props.bug.devResponse && (
            <Typography>{props.bug.devResponse}</Typography>
          )}
          {user.result.userName === props.bug.assigned &&
            (stateEditResponse ? (
              <Typography>{props.bug.devResponse}</Typography>
            ) : (
              <TextField
                value={stateDevResponse}
                onChange={handleResponse}
                sx={{ mt: 3 }}
                label="Developer Response"
                placeholder="Working on it..."
                fullWidth
                multiline
              />
            ))}
          <CardActions>
            <ButtonGroup
              aria-label="outlined primary button group"
              style={{ margin: "0 auto" }}
              fullWidth
            >
              {user.result.userName === props.bug.name && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={resolveClicked}
                >
                  {props.bug.isResolved ? "Unresolve" : "Resolve"}
                </Button>
              )}
              {user.result.userName === props.bug.assigned &&
                !stateEditResponse && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={submitResponse}
                  >
                    Respond
                  </Button>
                )}
              {user.result.userName === props.bug.assigned &&
                stateEditResponse && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={editDevResponse}
                  >
                    Edit Response
                  </Button>
                )}
              {user.result.userName === props.bug.name && (
                <>
                  <Button sx={{ color: "primary.text" }} onClick={editClicked}>
                    Edit
                  </Button>
                  <Button
                    sx={{ color: "primary.text" }}
                    onClick={deleteClicked}
                  >
                    Delete
                  </Button>
                </>
              )}
            </ButtonGroup>
          </CardActions>
        </CardContent>
      </Collapse>
    </Card>
  );
}
