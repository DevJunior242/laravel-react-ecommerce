import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "./AuthContext";
import { motion } from "motion/react";
import ErrorGlobal from "./ErrorGlobal";
function Register() {
  const { register } = UseAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    try {
      await register(formData);
      setSuccess(true);
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
          inscription{" "}
        </Typography>

        {success && <div className="text-green-600 mt-2">{success}</div>}
        <form onSubmit={handleSubmit}>
          <TextField
            error={!!error.name}
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          {error.name && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.name[0]}
            </FormHelperText>
          )}
          <TextField
            error={!!error.name}
            id="email"
            name="email"
            label="Email"
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
          <TextField
            error={!!error.password_confirmation}
            id="password_confirmation"
            name="password_confirmation"
            label="Password confirmation"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          {error.password_confirmation && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.password_confirmation[0]}
            </FormHelperText>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            register{" "}
          </Button>
        </form>
        <Button fullWidth sx={{ mt: 2 }}>
          <Link to="/login">se connecter</Link>
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
