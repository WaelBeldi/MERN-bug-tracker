// import { Button, Card, Grid, MenuItem, Modal, TextField } from "@mui/material";
// import { Box } from "@mui/system";
// import React, { useEffect, useState } from "react";
// import Input from "../Input";
// import UserModel from "../../Models/UserModel";
// import { useDispatch, useSelector } from "react-redux";
// import { createUser, updateUser } from "../../Redux/actions/usersActions";

// const UserCreateUpdate = ({
//   open,
//   handleClose,
//   showPassword,
//   handleShowPassword,
//   currentId,
//   setCurrentId
// }) => {
//   const [userObject, setUserObject] = useState(new UserModel());
//   const user = useSelector((state) =>
//     currentId ? state.usersReducers.find((u) => u._id === currentId) : null
//   );
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setUserObject({
//       ...userObject,
//       [e.target.name]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     if (user) setUserObject(user);
//   }, [user, dispatch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (currentId !== null) {
//       dispatch(
//         updateUser(currentId, { ...userObject })
//       );
//     } else {
//       dispatch(createUser({ ...userObject }));
//     }
//     handleClose();
//     setCurrentId(null);
//   };
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Card
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 2,
//           width: { xs: "75%", sm: "50%" },
//         }}
//         elevation={3}
//       >
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit}
//           sx={{ mt: 3 }}
//           xs={12}
//         >
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={12}>
//               <TextField
//                 name="userName"
//                 value={userObject.userName}
//                 onChange={handleChange}
//                 label="User Name"
//                 helperText=""
//                 required
//                 fullWidth
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 value={userObject.email}
//                 onChange={handleChange}
//                 autoComplete="email"
//                 required
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Input
//                 name="password"
//                 value={userObject.password}
//                 label="Password"
//                 handleChange={handleChange}
//                 type={showPassword ? "text" : "password"}
//                 handleShowPassword={handleShowPassword}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 select
//                 variant="standard"
//                 label="Role"
//                 name="role"
//                 value={userObject.role}
//                 onChange={(e) => {
//                   handleChange(e);
//                 }}
//                 sx={{ width: "100%" }}
//                 required
//               >
//                 <MenuItem value="tester">Tester</MenuItem>
//                 <MenuItem value="developer">Developer</MenuItem>
//               </TextField>
//             </Grid>
//           </Grid>
//           <Box
//             sx={{
//               display: "flex",
//               gap: { xs: "0", sm: "1rem" },
//               width: "60%",
//               margin: "0 auto",
//               flexDirection: { xs: "column", sm: "row" },
//             }}
//           >
//             <Button sx={{ mt: 2 }} onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button sx={{ mt: 2 }} variant="contained" type="submit">
//               Add
//             </Button>
//           </Box>
//         </Box>
//       </Card>
//     </Modal>
//   );
// };

// export default UserCreateUpdate;

import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import UserModel from "../../Models/UserModel";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../Redux/actions/usersActions";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserCreateUpdate = ({ currentId, setCurrentId }) => {
  const [userObject, setUserObject] = useState(new UserModel());
  const user = useSelector((state) =>
    currentId ? state.usersReducers.find((u) => u._id === currentId) : null
  );
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { ...userObject },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required."),
      email: Yup.string().email("Invalid email address."),
      password: Yup.string()
        .min(6, "Please enter a password with 6 or more characters.")
        .required("Please enter a password with 6 or more characters."),
      role: Yup.string().required("Role is required.")
    }),
    onSubmit: (values) => {
    if (currentId !== null) {
      dispatch(updateUser(currentId, { ...values }));
    } else {
      dispatch(createUser({ ...values }));
    }
    navigate("/usersManagement");
    setCurrentId(null);
    },
  });
  
  useEffect(() => {
    if (user)
    setUserObject({
      userName: user.userName,
      email: user.email,
      password: "",
      role: user.role,
    });
  }, [user, dispatch]);
  
  // const handleChange = (e) => {
  //   setUserObject({
  //     ...userObject,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (currentId !== null) {
  //     dispatch(updateUser(currentId, { ...userObject }));
  //   } else {
  //     dispatch(createUser({ ...userObject }));
  //   }
  //   navigate("/usersManagement");
  //   setCurrentId(null);
  // };
  
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
          xs={12}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                label="Username"
                error={formik.errors.userName}
                helperText={
                  formik.errors.userName ? formik.errors.userName : ""
                }
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email Address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete="email"
                error={formik.errors.email}
                helperText={formik.errors.email ? formik.errors.email : ""}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                name="password"
                value={formik.values.password}
                label="Password"
                handleChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                error={formik.errors.password}
                helperText={
                  formik.errors.password ? formik.errors.password : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                variant="standard"
                label="Role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                sx={{ width: "100%" }}
                error={formik.errors.role}
                helperText={formik.errors.role ? formik.errors.role : ""}
                required
              >
                <MenuItem value="tester">Tester</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid
            // sx={{
            //   display: "flex",
            //   gap: { xs: "0", sm: "1rem" },
            //   width: "60%",
            //   margin: "0 auto",
            //   flexDirection: { xs: "column", sm: "row" },
            // }}
            container
            gap={1}
            sx={{ maxWidth: "66%", margin: "0 auto", justifyContent: "center" }}
          >
            <Button sx={{ mt: 2 }}>
              <Link
                to="/usersManagement"
                className="cancel-link"
                color="primary.main"
              >
                Cancel
              </Link>
            </Button>
            <Button sx={{ mt: 2 }} variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default UserCreateUpdate;