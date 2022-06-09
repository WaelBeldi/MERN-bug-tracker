import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import PriorityColors from "./PriorityColors";

import { useDispatch } from "react-redux";
import {
  deleteBug,
  resolveBug,
  devRespond,
} from "../../Redux/actions/bugsActions";

import BugEdit from "./BugEdit";
import MDEditor from "@uiw/react-md-editor";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

const BugView = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateDevResponse, setStateDevResponse] = useState("");
  const [stateEditResponse, setStateEditResponse] = useState(
    props.bug.devResponse
  );
  const user = JSON.parse(localStorage.getItem("profile"));

  const editClicked = () => {
    props.setCurrentId(props.bug._id);
    navigate("/createBugIssue");
  };
  const deleteClicked = () => {
    dispatch(deleteBug(props.bug._id));
    props.collapse();
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

  const { BGcolor } = PriorityColors(props.bug.priority);

  return (
    <Box>
      <Card variant="outlined">
        <CardHeader
          // action={
          //   user.result.userName === props.bug.name && (
          //     <BugEdit
          //       editClicked={editClicked}
          //       deleteClicked={deleteClicked}
          //       bug={props.bug}
          //     />
          //   )
          // }
          title={props.bug.title}
          subheader={props.bug.priority.level}
          sx={{ bgcolor: BGcolor, color: "primary.text" }}
        />
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.primary"
            fontStyle="italic"
          >
            Version {props.bug.version}
          </Typography>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.primary"
            fontStyle="italic"
          >
            Created by {props.bug.name}
            <Typography variant="inline" sx={{ float: "right" }}>
              {moment(props.bug.createdOn).fromNow()}
            </Typography>
          </Typography>

          <Typography
            sx={{ fontSize: 14 }}
            color="text.primary"
            fontStyle="italic"
          >
            Assigned to {props.bug.assigned}
          </Typography>

          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography variant="h5" color="primary.main">
            Steps:
          </Typography>
          <MDEditor.Markdown source={props.bug.steps} />
          <Divider sx={{ mt: 1, mb: 1 }} />

          <Typography variant="h5" color="primary.main">
            Details:
          </Typography>
          <MDEditor.Markdown source={props.bug.details} />
          <Divider sx={{ mt: 1, mb: 1 }} />
          {((user.result.role === "admin" && props.bug.devResponse) ||
            (user.result.userName === props.bug.assigned &&
              stateEditResponse)) && (
            <Typography variant="h5" color="primary.main">
              Developer's Response:
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
        </CardContent>
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
            {user.result.userName === props.bug.assigned && !stateEditResponse && (
              <Button
                variant="contained"
                color="success"
                onClick={submitResponse}
              >
                Respond
              </Button>
            )}
            {user.result.userName === props.bug.assigned && stateEditResponse && (
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
                <Button sx={{ color: "primary.text" }} onClick={deleteClicked}>
                  Delete
                </Button>
              </>
            )}
            {/* <Button variant="outlined" onClick={props.collapse}>
              Collapse
            </Button> */}

            <ExpandMoreIcon
              sx={{ transform: "rotate(180deg)" }}
              onClick={props.collapse}
            />
          </ButtonGroup>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BugView;
