import React, { useState } from "react";
import { Instance } from "../Api/Axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ErrorGlobal from "../Api/ErrorGlobal";
function ProductCreate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", file);

    try {
      const res = await Instance.post("api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setSuccess(res.data.message);
      setName("");
      setDescription("");
      setPrice("");
      setFile(null);
    } catch (error) {
      ErrorGlobal({ error, setError });
    }
  };
  return (
    <Container maxWidth="md">
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
          veuillez remplir les champs{" "}
        </Typography>
        {error.general && (
          <Typography textAlign={"center"} color={"red"}>
            {error.general}
          </Typography>
        )}
        {success && (
          <Typography textAlign={"center"} color={"green"}>
            {success}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            error={!!error.name}
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.name[0]}
            </FormHelperText>
          )}

          <TextField
            error={!!error.price}
            id="price"
            name="price"
            label="price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error.price && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.price[0]}
            </FormHelperText>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            choisir un fichier
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>

          {error.file && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.file[0]}
            </FormHelperText>
          )}
          <TextField
            error={!!error.description}
            name="description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error.description && (
            <FormHelperText error textAlign={"center"} color={"red"}>
              {error.description[0]}
            </FormHelperText>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            valider
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ProductCreate;
