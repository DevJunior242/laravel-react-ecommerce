import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../theme";

function Footer() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box component="footer">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8,
          backgroundColor: colors.primary[700],
          mt: 4,
        
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          E-commerce @2025 - All rights reserved
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
