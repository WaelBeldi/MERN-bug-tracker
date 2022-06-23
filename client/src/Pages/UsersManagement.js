import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";

import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, getUsers } from "../Redux/actions/usersActions";
import UserCreateUpdate from "../Components/UsersComps/UserCreateUpdate";
import UserDelete from "../Components/UsersComps/UserDelete";
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "userName",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              p: "8px 16px",
              minWidth: headCell.minWidth,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontSize: "medium", fontWeight: "bold" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}

const UsersManagement = ({ currentId, setCurrentId }) => {
  const users = useSelector((state) => state.usersReducers);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, currentId]);

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/usersManagement/addUser');
  };

  // const handleEdit = () => {
  //   setCurrentId(user._id);
  //   navigate("/createBugIssue");
  // };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return !users.length ? (
    <Box sx={{ padding: "0 0.5rem" }}>
      <Typography
        align="center"
        component="h1"
        variant="h5"
        sx={{ mb: "10px" }}
      >
        Users Management
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <CssBaseline />
        <Button
          variant="contained"
          sx={{ margin: "0.5rem 1rem" }}
          onClick={() => {handleAdd()}}
        >
          Add user
        </Button>

        {/* <UserCreateUpdate
          // open={open}
          // handleClose={handleClose}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
          currentId={currentId}
          setCurrentId={setCurrentId}
        /> */}

        <TableContainer>
          <Table>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No users found!
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  ) : (
    <Box sx={{ padding: "0 0.5rem" }}>
      <Typography
        align="center"
        component="h1"
        variant="h5"
        sx={{ mb: "10px" }}
      >
        Users Management
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <CssBaseline />
        <Button
          variant="contained"
          sx={{ margin: "0.5rem 1rem" }}
          // onClick={handleOpen}
          onClick={handleAdd}
        >
          Add user
        </Button>

        {/* <UserCreateUpdate
          open={open}
          handleClose={handleClose}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
        /> */}

        <TableContainer>
          <Table sx={{}} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((user) => {
                  return (
                    <TableRow hover key={user._id}>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell padding="none" align="center">
                        <IconButton onClick={() => {
                          setCurrentId(user._id);
                          navigate('/usersManagement/addUser')
                        }}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell padding="none" align="center">
                        <IconButton onClick={handleOpenDelete}>
                          <DeleteIcon />
                        </IconButton>
                        <UserDelete
                          openDelete={openDelete}
                          handleCloseDelete={handleCloseDelete}
                          handleDelete={() => {
                            handleDelete(user._id);
                            handleCloseDelete();
                          }}
                          user={user}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UsersManagement;
