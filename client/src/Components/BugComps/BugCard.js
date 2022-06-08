import React from "react";
import moment from "moment";
import PriorityColors from "./PriorityColors";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const OutlinedCard = (props) => {
  const { title, version, name, createdOn, isResolved, assigned } = props.bug;

  return (
    <React.Fragment>
      <CardContent style={{ color: props.Tcolor }}>
        <Typography color="text.primary" gutterBottom>
          {props.level}
          <Typography variant="inline" sx={{ float: "right" }}>
            {isResolved ? "RESOLVED" : "ACTIVE"}
          </Typography>
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.primary">
          Version: {version}
        </Typography>
        <Typography variant="body2">
          Created by {name}
          <Typography variant="inline" sx={{ float: "right" }}>
            {moment(createdOn).fromNow()}
          </Typography>
        </Typography>
        <Typography variant="body2">Assigned to {assigned}</Typography>
      </CardContent>
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
    <Box onClick={Clicked}>
      <Card style={{ backgroundColor: BGcolor }}>
        <OutlinedCard bug={props.bug} level={level} />
      </Card>
    </Box>
  );
}

export default BugCard;