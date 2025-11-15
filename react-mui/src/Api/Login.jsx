import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Instance } from "./Axios";
import { UseAuth } from "./AuthContext";
import ErrorGlobal from "./ErrorGlobal";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = UseAuth();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    try {
      await login(formData);
      navigate("/");
    } catch (error) {
    ErrorGlobal({ error, setError });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        sx={{
          mt: 8,
          boxShadow: 10,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h4" component={"h1"} textAlign={"center"}>
          Connexion{" "}
        </Typography>
        {error.general && (
          <Typography textAlign={"center"} color={"red"}>
            {error.general}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
          error={!!error.email}
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          {error.email && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.email[0]}
            </FormHelperText>
          )}
          <TextField
          error={!!error.password}
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          {error.password && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.password[0]}
            </FormHelperText>
          )}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            login
          </Button>
        </form>
        <Button fullWidth sx={{ mt: 2 }}>
          <Link to="/register">Register</Link>
        </Button>
      </Box>
    </Container>
  );
}

export default Login;


