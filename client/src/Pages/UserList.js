import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../Redux/actions/usersActions";
import UserCard from "./UserCard";

const UserList = ({ user }) => {
  const users = useSelector((state) => state.usersReducers);
  const disptach = useDispatch();

  useEffect(() => {
    disptach(getUsers());
  }, [disptach]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to Delete this user?")) {
      disptach(deleteUser(id));
    }
  };

  return !users.length ? (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ height: "80vh" }}
    >
      <h1>No users</h1>
    </Grid>
  ) : (
    <div>
      {users.map((user, key) => {
        return <UserCard user={user} key={key} />;
      })}
    </div>
  );
};

export default UserList;
