import {
  Box,
  Grid,
  Typography,
  useTheme,
  Button,
  Card,
  Pagination,
  TextField,
} from "@mui/material";
import { tokens } from "../theme";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Instance } from "../Api/Axios";
("use client");
import { Link } from "react-router-dom";

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
 
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await Instance.get("api/index");
        console.log(response);
        const p = response.data.products ?? response.data;
        setProducts(p);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);


  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    const quantity = e.target.quantity.value;
    try {
      const response = await Instance.post(`api/cart/${product.id}`, {
        product_id: product.id,
        quantity: quantity,
      });
      console.log(response);

      setSuccess(response.data.message);
      setError((prev) => ({ ...prev, [product.id]: null }));
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          const validatorErrors = error.response.data.errors;
          console.log(validatorErrors);
          setError((prev) => ({ ...prev, [product.id]: validatorErrors }));
          e.target.reset();
          // console.warn(data.errors);
        } else {
          setError({ general: data.message || " Something went wrong" });
          console.warn(data);
        }
      } else {
        setError({ general: error.message });
      }
    }
  };

  const [page, setPage] = useState(1);
  const itemPage = 12;

  const totalPage = Math.ceil(products.length / itemPage);
  const startIndex = (page - 1) * itemPage;
  const endIndex = startIndex + itemPage;
  const paginatedItems = products.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "calc(100vh - 100px)",
        mx: 2,
      }}
    >
      {success && (
        <Typography textAlign={"center"} color={"green"}>
          {success}
        </Typography>
      )}
      {error.general && (
        <Typography textAlign={"center"} color={"red"}>
          {error.general}
        </Typography>
      )}
      <Grid container spacing={2} sx={{ pb: 2 }}>
        {paginatedItems.map((product) => (
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              mx: "auto",
              borderRadius: 2,
            }}
            minHeight={200}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            key={product.id}
          >
            <Card
              sx={{
                width: "100%",
                boxShadow: 3,
                overflow: "hidden",
                borderRadius: 2,
                bgcolor: "background.default",
              }}
            >
              <CardMedia
                component={motion.div}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.5 }}
                sx={{ height: 160 }}
                image={product.path}
                name={product.name}
              />
              <Box sx={{ position: "relative" }}>
                <CardContent sx={{ backgroundColor: "background.default" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: colors.gray[100] }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.gray[100] }}>
                    <Link
                      to={`/product/show/${product.id}`}
                      style={{
                        textDecoration: "none",
                         color: colors.gray[100],
                      }}
                    >
                      {product.description}
                    </Link>
                  </Typography>
                </CardContent>
                <CardActions sx={{ backgroundColor: "background.default" }}>
                  {product.price && (
                    <Typography
                      variant="subtitle1"
                      component={"div"}
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          size="large"
                          sx={{
                            color: colors.gray[100],
                          }}
                        >
                          {product.price} €
                        </Button>
                        <form onSubmit={(e) => handleAddToCart(e, product)}>
                          {error[product.id]?.quantity && (
                            <Typography textAlign={"center"} color={"red"}>
                              {error[product.id].quantity[0]}
                            </Typography>
                          )}
                          <input
                            type="number"
                            min="1"
                            max="10"
                            defaultValue={1}
                            name="quantity"
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                            style={{
                              width: 60,
                              textAlign: "center",
                              marginRight: 10,
                            }}
                          />

                          <Button
                            type="submit"
                            size="small"
                            variant="outlined"
                             color="primary"
                          >
                            <AddShoppingCartIcon /> Add cart
                          </Button>
                        </form>
                      </Box>
                    </Typography>
                  )}
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={totalPage}
          sx={{ color: colors.gray[100] }}
        />
      </Box>
    </Box>
  );
}

export default Home;
