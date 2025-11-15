import { motion, useScroll } from "motion/react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
import React from "react";

function ScrollIndicator() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Box
        id="scroll-indicator"
        component={motion.div}
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: colors.orange[600],
        }}
      />
    </>
  );
}

export default ScrollIndicator;
