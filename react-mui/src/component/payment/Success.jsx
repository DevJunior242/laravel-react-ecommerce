import { Box, Container, Typography } from "@mui/material";
import React from "react";

function Success() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ my: 4, backgroundColor: "background.paper" }}
      >
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          textAlign={"center"}
          color="success.main"
        >
          Payment Success
        </Typography>
      </Container>
    </Box>
  );
}

export default Success;
