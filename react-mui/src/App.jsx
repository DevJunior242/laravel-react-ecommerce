import {
  CssBaseline,
  ThemeProvider,
  Box,
  
  Divider,
} from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Topbar from "./Header/Topbar";
import Home from "./component/Home";

import Customer from "./component/Customer";
import Contact from "./component/Contact";
import About from "./component/About";
import Product from "./component/Product";
import NotFound from "./component/NotFound";
import Footer from "./component/Footer";
import ScrollToTop from "./component/ScrollToTop";
import ScrollIndicator from "./component/ScrollIndicator";
import Setting from "./component/settings/Setting";
import Account from "./component/settings/Account";
import Nof from "./component/settings/Nof";
import Register from "./Api/Register";
import Login from "./Api/Login";
import AuthContext, { AuthProvider, UseAuth } from "./Api/AuthContext";
import ProfileUpdate from "./Api/ProfileUpdate";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import ProductCreate from "./products/ProductCreate";
import ProductUpdate from "./products/ProductUpdate";
import ProductShow from "./products/ProductShow";
import ProductEdit from "./products/ProductEdit";
import Show from "./component/Cart/Show";
import Success from "./component/payment/Success";
import OrderShow from "./component/Order/OrderShow";
import Cancel from "./component/payment/Cancel";
import Nav from "./Header/Nav";
const ProtectedRoute = () => {
  const { isLogIn } = UseAuth();
  console.log(isLogIn);
  return isLogIn ? <Outlet /> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/order/show" element={<OrderShow />} />
          <Route path="/product" element={<Product />} />
          <Route path="/notifications" element={<Nof />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/create" element={<ProductCreate />} />
          <Route path="/product/show/:id" element={<ProductShow />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/product/update" element={<ProductUpdate />} />
          <Route path="/cart/show" element={<Show />} />
          <Route path="/profile" element={<ProfileUpdate />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/payment-cancel" element={<Cancel />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Box
            sx={{
              bgcolor: "background.default",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Topbar />
            <Divider />
            <Nav />
            <Box component="main" sx={{ flex: 1, pb: 40 }}>
              <ScrollIndicator />

              <AppRoutes />
            </Box>

            <Footer />
            <ScrollToTop />
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
