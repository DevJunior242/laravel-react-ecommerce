import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  Grid,
  Box,
} from "@mui/material";
import { tokens } from "../../theme";

const products = [
  {
    categorie: "Electronique  A",
    products: [
      {
        title: "Samsung Galaxy S23 Ultra",
        description:
          "Le Samsung Galaxy S23 Ultra est unssant Snapdragon 8 Gen 2, de 12 Go de RAM et d'une batterie de 5000 mAh. Il dispose également d'un système de caméra avancé avec un capteur principal de 200 MP, offrant des performances exceptionnelles en photographie et en vidéo.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ0TbQo4uEVw3wy_eTcCfabtCywP8HY8k6aw&s",
        price: 1199.99,
      },
      {
        title: "Apple iPhone 14 Pro Max",
        description:
          "L'Apple iPhone 14 Pro  pouces,  offre un système de caméra avancé avec un capteur principal de 48 MP, ainsi que des fonctionnalités exclusives telles que Face ID et iOS 16.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxA8QVQDe3guNttQMjkAPrPCK7utj7XhWEJw&s",
        price: 1299.99,
      },
      {
        title: "Dell XPS 13",
        description: "un processeur",
        img: "https://cdn.futura-sciences.com/sources/images/qr/choisir-ordinateur-pc.jpeg",
        price: 1499.99,
      },
    ],
  },
  {
    categorie: "Electronique B",
    products: [
      {
        title: "Apple iPhone 14 Pro Max",
        description:
          "L'Apple iPhone 14 Pro Max est un smartphone premium avec un écran OLED de 6,7 pouces, équipé de la puce A16 Bionic, de 6 Go de RAM et d'une batterie longue durée. Il offre un système de caméra avancé avec un capteur principal de 48 MP, ainsi que des fonctionnalités exclusives telles que Face ID et iOS 16.",
        img: "https://img.static-af.com/transform/2cccb610-013e-4eb9-b8f2-3a02be874523/",
        price: 1299.99,
      },
      {
        title: "Sony WH-1000XM5",
        description:
          "Le Sony WH-1000XM5 est un casque sans fil haut de gamme offrant une qualité sonore exceptionnelle et une réduction de bruit active avancée. Il dispose d'un design confortable, d'une autonomie de batterie allant jusqu'à 30 heures et de fonctionnalités intelligentes telles que la détection de port et l'assistant vocal intégré.",
        img: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
        price: 399.99,
      },
      {
        title: "Dell XPS 13",
        description:
          "Le Dell XPS 13 est un ordinateur portable  une portabilité optimale.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6pa9I-wRrxGg01hr9w5YKlefPQcJ08WMSyQ&s",
        price: 1499.99,
      },
    ],
  },
  {
    categorie: "Electronique C",
    products: [
      {
        title: "Apple iPhone 14 Pro Max",
        description: "L'Apple i  Face ID et iOS 16.",
        img: "https://www.crucial.com/content/dam/crucial/articles/for-pc-builders/white-build-2.jpg.transform/small-jpg/img.jpg",
        price: 1299.99,
      },
      {
        title: "Sony WH-1000XM5",
        description:
          "Le Sony  sonore exce  Il dispose d  d'une autonomie de batterie allant jusqu'à 30 heures et de fonctionnalités intelligentes telles que la détection de port et l'assistant vocal intégré.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuXy3xNcqoaFmmtGkxGsNUO8pUOyU5qOMTkg&s",
        price: 399.99,
      },
      {
        title: "Dell XPS 13",
        description: "un processeur",
        img: "https://cdor.fr/media/catalog/product/cache/d08ea8fe287bfecd2a2fac4a9f7b4ae7/202111/festina/F20285_3_P_1_f20285_3.jpg",
        price: 1499.99,
      },
    ],
  },
];
function Other() {
  const colors = tokens(useTheme().palette.mode);
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        p: 3,
        mt: 4,

        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h3"
        sx={{ mb: 2, color: colors.gray[100], alignItems: "center" }}
      >
        Catalogue de Produits
      </Typography>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ width: {xs:"100%", md:"100%"}, paddingBottom: "40px" }}
      >
        {products.map((items, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                textAlign: "center",
                 width: {xs:"100%", md:"100%"},
                p:3,
                backgroundColor: colors.primary[500],
                borderRadius: 2,
              }}
            >
              <Typography variant="h3" sx={{ mb: 2, color: colors.gray[100] }}>
                {items.categorie}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {items.products.map((product, idx) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                    }}
                  >
                    <Card
                      elevation={4}
                      sx={{
                        width: {xs:"100px", md:"300px"},
                        height: {xs:"100px", md:"100%"},
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 2,
                        m: 2,
                        backgroundColor: colors.primary[400],
                      }}
                    >
                      <CardContent sx={{ p: 1  }}>
                        <Typography>
                          <img
                            src={product.img}
                            alt={product.title}
                            width="100px"
                            height="100px"
                          />
                        </Typography>
                        <Typography variant="h4" component="div">
                          {product.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          align="center"
                          mt={0.5}
                          fontWeight="medium"
                        >
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default Other;
