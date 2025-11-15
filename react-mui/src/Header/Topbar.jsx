import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import {
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Instance } from "../Api/Axios";
const settings = [
  { id: 4, icon: <AddShoppingCartIcon />, href: "/cart/show" },
  { id: 5, icon: "Order", href: "/order/show" },
];
function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await Instance.get("api/cart/count");
        console.log(response);
        setCart(response.data.cart);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCart();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{ flexGrow: 1, fontSize: { xs: "10px", md: "2rem" } }}
      >
        E-Commerce
      </Typography>

      <Box
        sx={{
          display: "flex",
          backgroundColor: colors.primary[700],
          borderRadius: 1,
          p: 1,
          alignItems: "center",
        }}
      >
        <InputBase
          placeholder="search..."
          sx={{
            ml: 2,
            flex: 1,
            fontSize: { xs: "12px", md: "1rem" },
            padding: "4px",
          }}
        />

        <IconButton
          type="button"
          sx={{ p: 0, fontSize: { xs: "2px", md: "1rem" } }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex" }}>
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{ fontSize: { xs: "2px", md: "1rem" } }}
        >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <List>
            {settings.map((setting) => (
              <ListItem
                key={setting.id}
                sx={{
                  display: "inline",
                  width: "auto",
                  p: 0.5,
                  cursor: "pointer",
                  borderRadius: 2,
                  "&:hover": { background: colors.zinc[300] },
                  fontSize: { xs: "0.8rem", md: "1rem" },
                }}
              >
                <NavLink
                  to={setting.href}
                  style={{
                    textDecoration: "none",
                    color: colors.gray[100],
                  }}
                >
                  {setting.icon}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </IconButton>
      </Box>
    </Box>
  );
}

export default Topbar;
