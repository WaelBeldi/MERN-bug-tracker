import React from "react";
import moment from "moment";
import PriorityColors from "./PriorityColors";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActions, CardHeader } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OutlinedCard = (props) => {
  const { title, version, name, createdOn, isResolved, assigned } = props.bug;

  return (
    <React.Fragment>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: props.BGcolor }}>
            {props.level === "High"
              ? "H"
              : props.level === "Moderate"
              ? "M"
              : "L"}
          </Avatar>
        }
        title={
          <Typography variant="h6" color="text.primary">
            {props.level}
            <Typography variant="inline" sx={{ float: "right" }}>
              {props.bug.isResolved ? "RESOLVED" : "ACTIVE"}
            </Typography>
          </Typography>
        }
        sx={{ p: "0.5rem 1rem", bgcolor: props.BGcolor }}
      />
      <CardContent style={{ color: props.Tcolor }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary" fontStyle="italic">
          Version: {version}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.primary"
          fontStyle="italic"
        >
          Created by {name}
          <Typography variant="inline" sx={{ float: "right" }}>
            {moment(createdOn).fromNow()}
          </Typography>
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.primary"
          fontStyle="italic"
        >
          Assigned to {assigned}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0, justifyContent: "flex-end" }}>
          <ExpandMoreIcon style={{ float: "right" }} onClick={props.clicked} />
      </CardActions>
    </React.Fragment>
  );
};

const BugCard = (props) => {
  const priorityTheme = props.bug.isResolved
    ? 3 + parseInt(props.bug.priority)
    : props.bug.priority;
  const { level, BGcolor } = PriorityColors(priorityTheme);
  const Clicked = () => {
    props.clicked(props.bug._id, priorityTheme);
  };

  return (
    <Card elevation={3}>
      <OutlinedCard bug={props.bug} level={level} BGcolor={BGcolor} clicked={Clicked} />
    </Card>
  );
};

export default BugCard;
