import { Typography, Box } from "@mui/material";
import { UseAuth } from "./AuthContext";

function User() {
  const { LogIn, user, setUser, logout } = UseAuth();
  return (
    <Box>
      <Typography variant="h4" component={"h1"} textAlign={"center"}>
        {user.name}
      </Typography>
    </Box>
  );
}

export default User;
