import React, { useState } from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Button,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Tooltip,
  Typography,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UseAuth } from "../Api/AuthContext";
const items = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
  { title: "Product", href: "/product" },
  { title: "Add Product", href: "/product/create" },

  { title: "register", href: "/register" },
  { title: "login", href: "/login" },
];
//  { id: 1, icon: <SettingsOutlined />, href: "/setting" },
//   { id: 2, icon: <NotificationsOutlined />, href: "/notifications" },
//   { id: 3, icon: <PersonOutlined />, href: "/profile" },
function Nav() {
  const { isLogIn, logout, user } = UseAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  //account
  const [anchorEl, setAnchorEl] = useState(null);

  const openAccount = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccount = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const filterItems = isLogIn
    ? items.filter(
        (item) =>
          item.title.toLowerCase() !== "login" &&
          item.title.toLowerCase() !== "register"
      )
    : items;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <motion.img
        src="https://tekplus.ca/wp-content/uploads/2023/01/ecommerce.jpeg"
        height={50}
        width={50}
        style={{ borderRadius: "50%" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.5 }}
        alt="devjunior"
      />

      <List sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
        {filterItems.map((item) => (
          <ListItem
            key={item.title}
            sx={{
              display: "inline",
              width: "auto",
              p: 0.5,
              cursor: "pointer",
              borderRadius: 2,
              "&:hover": { background: colors.zinc[300] },
            }}
          >
            <NavLink
              to={item.href}
              style={{
                textDecoration: "none",
                color: colors.gray[100],
              }}
            >
              {item.title}
            </NavLink>
          </ListItem>
        ))}

        {isLogIn && (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openAccount}
              onClose={handleCloseAccount}
              onClick={handleCloseAccount}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    backgroundColor: "background.default",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleCloseAccount}>
                <Avatar /> Profile
              </MenuItem>

              <Divider />
              <MenuItem onClick={handleCloseAccount}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                <Link to="/register">Add another account</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseAccount}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <Link to="/setting">Settings</Link>
              </MenuItem>
              <MenuItem>
                <Button onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  logout
                </Button>
              </MenuItem>
            </Menu>
          </>
        )}
      </List>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <Button
          id="menu-button"
          aria-controls={open ? "menu-fullscreen" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpen}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="menu-fullscreen"
          aria-labelledby="menu-button"
          anchorReference="none"
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              maxHeight: "100vh",
              maxWidth: "100vw",
              backgroundColor: "background.default",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            },
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ fontSize: 50, fontWeight: "bold", color: "#0606CF" }}
          >
            x
          </Button>
          {filterItems.map((item) => (
            <MenuItem
              key={item.title}
              sx={{ width: "auto" }}
              onClick={handleClose}
            >
              <NavLink
                to={item.href}
                style={({ isActive }) => ({
                  "&:hover": { color: "#0606CF" },
                  color: isActive ? "#FD1D1D" : "#141499",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                {item.title}
              </NavLink>
            </MenuItem>
          ))}
          {isLogIn && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user?.name?.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openAccount}
                onClose={handleCloseAccount}
                onClick={handleCloseAccount}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      backgroundColor: "background.default",
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleCloseAccount}>
                  <Avatar /> Profile
                </MenuItem>

                <Divider />
                <MenuItem onClick={handleCloseAccount}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  <Link to="/register">Add another account</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseAccount}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <Link to="/setting">Settings</Link>
                </MenuItem>
                <MenuItem>
                  <Button onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    logout
                  </Button>
                </MenuItem>
              </Menu>
            </>
          )}
        </Menu>
      </Box>
    </Box>
  );
}

export default Nav;
