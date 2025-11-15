import { useTheme, Box, Typography, Container, Button } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Instance } from "../Api/Axios";
import { Link } from "react-router-dom";
import ErrorGlobal from "../Api/ErrorGlobal";

function ProductShow() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(id);
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await Instance.get(`api/product/show/${id}`);
        console.log(response);
        const p = response.data.product;
        setProduct(p);
      } catch (error) {
        setProduct(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);
  //delete product
  const handleDelete = async (e) => {
    e.preventDefault();
    setError({});
    try {
      const res = await Instance.delete(`api/product/${id}/delete`);
      console.log(res);
      setSuccess(res.data.message);
      setProduct(null);
    } catch (error) {
      console.log(error);
      ErrorGlobal({ error, setError });
    }
  };

  if (loading) return <div>Loading...</div>;
  console.log(product);

  if (!product) {
    return (
      <Box>
        <Typography
          variant="h4"
          component={"h1"}
          textAlign={"center"}
          color={"red"}
        >
          product not found
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
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "calc(100vh - 100px)",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${product.path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&:after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0)",
            transition: "background-color .5 ease-in-out",
          },
        }}
      >
        <Typography
          variant="h1"
          color={colors.gray[100]}
          fontWeight="bold"
          zIndex={1}
        >
          {product.name}
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
            marginBottom: 4,
            gap: 4,
          }}
        >
          <Box
            data-aos="zoom-in"
            component={"img"}
            src="https://t-mobile.scene7.com/is/image/Tmusprod/9244592_Samsung_Galaxy-S25-FE_Navy_KV_Dynamic_4x3:1x1?fmt=jpg&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0"
            alt=""
            sx={{
              width: 400,
              height: 400,
              borderRadius: 2,
            }}
          />

          <Box>
            <Typography variant="h2" fontWeight="bold" sx={{ marginBottom: 2 }}>
              Description
            </Typography>
            <Typography variant="body1">
              The Samsung Galaxy S23 Ultra is a flagship smartphone that
              combines cutting-edge technology with sleek design. It features a
              stunning 6.8-inch Dynamic AMOLED display with a 120Hz refresh
              rate, providing vibrant colors and smooth scrolling. Powered by
              the latest Snapdragon 8 Gen 2 processor, it ensures top-notch
              performance for gaming and multitasking. The device boasts a
              versatile quad-camera setup, including a 200MP main sensor,
              allowing users to capture high-quality photos and videos in
              various lighting conditions. With its large battery capacity and
              fast charging capabilities, the S23 Ultra is designed to keep up
              with your busy lifestyle. Additionally, it offers advanced
              features such as S Pen support, 5G connectivity, and enhanced
              security options, making it a comprehensive choice for tech
              enthusiasts.
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              Price: $1199
            </Typography>
          </Box>
        </Container>
      </Box>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
            marginBottom: 4,
            gap: 4,
          }}
        >
          <Box
            data-aos="zoom-in"
            component={"img"}
            src="https://static.skyassets.com/contentstack/assets/blt143e20b03d72047e/blt8edb8f256685160c/68c09b74f6520e9edd24eec0/2025_Q3_Sep_Apple_Launch_Keynote_Phase_1_Brand_Hub_Apple_at_Sky_Hero_Mobile_V1.png"
            alt=""
            sx={{
              width: 400,
              height: 400,
              borderRadius: 2,
            }}
          />

          <Box>
            <Typography variant="h2" fontWeight="bold" sx={{ marginBottom: 2 }}>
              Description
            </Typography>
            <Typography variant="body1">
              Get our 50GB data plan for just £10 a month for the first 9 months
              £20 a month thereafter. 12-month minimum term. Offer applied in
              basket. Data plan price may increase during your new minimum term.
              Discount cannot be used with other SIM offers. Fair usage policy
              applies. See sky.com/FUP enthusiasts.
            </Typography>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              Price: $150000
            </Typography>
          </Box>
        </Container>
      </Box>
      {product && (
        <Box sx={{ marginTop: 4, marginBottom: 4 }}>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
              marginBottom: 4,
              gap: 4,
            }}
          >
            <Box
              data-aos="zoom-in"
              component={"img"}
              src={product.path}
              sx={{
                width: 400,
                height: 400,
                borderRadius: 2,
              }}
            />

            <Box>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ marginBottom: 2 }}
              >
                Description
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ marginTop: 2, marginBottom: 2 }}
              >
                Price: ${product.price}
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "red" }}
                >
                  delete
                </Button>
                <Button
                  component={Link}
                  variant="contained"
                  to={`/product/edit/${product.id}`}
                  fullWidth
                  sx={{ mt: 2, backgroundColor: "green" }}
                >
                  Edit
                </Button>
               </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default ProductShow;
