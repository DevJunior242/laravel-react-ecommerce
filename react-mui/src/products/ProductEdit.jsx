import React, { useEffect, useState } from "react";
import { Instance } from "../Api/Axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorGlobal from "../Api/ErrorGlobal";

function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await Instance.get(`api/product/edit/${id}`);
        console.log(response);
        const p = response.data.product;

        setProduct(p);
        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setFile(p.file);
      } catch (error) {
        setProduct(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    const formData = new FormData();
    formData.append("name", name || product.name);
    formData.append("description", description || product.description);
    formData.append("price", price || product.price);

    if (file instanceof File) {
      formData.append("file", file);
    }

    try {
      const res = await Instance.post(`api/product/${id}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setSuccess(res.data.message);
      navigate("/product/show/" + id);
    } catch (error) {
     ErrorGlobal({ error, setError });
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!product) {
    return (
      <Box>
        <Typography>product not found</Typography>
        {error.general && (
          <Typography textAlign={"center"} color={"red"}>
            {error.general}
          </Typography>
        )}
      </Box>
    );
  }
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
          <Typography>
            <img src={product.path} alt="" />
          </Typography>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            changer le fichier
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

export default ProductEdit;
