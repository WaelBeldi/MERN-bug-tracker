import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getUsers } from "../Redux/actions/usersActions";

const UserCard = ({user}) => {

  const disptach = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to Delete this user?")) {
      disptach(deleteUser(id));
      disptach(getUsers())
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.role}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Update</Button>
        <Button size="small" onClick={() => deleteHandler(user._id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;