import React from "react";
import { Box, Button, Card, Modal, Typography } from "@mui/material";

const UserDelete = ({ openDelete, handleCloseDelete, handleDelete, user }) => {
  return (
    <Modal open={openDelete} onClose={handleCloseDelete}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "50%", sm: "40%" },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
        elevation={3}
      >
        <Typography
          variant="h6"
          component="h2"
          textAlign="center"
        >
          Are you sure you want to delete "{user.userName}"?
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: "0", sm: "1rem" },
            width: "60%",
            margin: "0 auto",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-around"
          }}
        >
          <Button variant="outlined" sx={{ mt: 2, width: "100%" }} onClick={handleCloseDelete}>
            No
          </Button>
          <Button
            sx={{ mt: 2, width: "100%" }}
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default UserDelete;
