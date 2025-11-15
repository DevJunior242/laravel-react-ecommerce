import React, { useEffect, useState } from "react";
import { Instance } from "../Api/Axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { motion } from "motion/react";
import ErrorGlobal from "../Api/ErrorGlobal";

function ProductUpdate({ productId }) {
  const [product, setProduct] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await Instance.get(`api/products/${1}`);

        const p = response.data.product;

        setProduct(p);
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setFile(p.file);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const formData = new FormData();
    formData.append("name", name || product.name);
    formData.append("description", description || product.description);
    formData.append("price", price || product.price);
    formData.append("file", file || product.file);

    try {
      const res = await Instance.put(`api/product/${1}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setSuccess(res.data.message);
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
            <Typography textAlign={"center"} color={"red"}>
              {error.name[0]}
            </Typography>
          )}

          <TextField
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
            <Typography textAlign={"center"} color={"red"}>
              {error.price[0]}
            </Typography>
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
            <Typography textAlign={"center"} color={"red"}>
              {error.file[0]}
            </Typography>
          )}
          <TextField
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
            <Typography textAlign={"center"} color={"red"}>
              {error.description[0]}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            valider
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default ProductUpdate;
