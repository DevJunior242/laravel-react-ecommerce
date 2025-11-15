import React, { useEffect, useState } from "react";
import { Instance } from "../../Api/Axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
function OrderShow() {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const getOrder = async (page = 1) => {
    setLoading(true);
    try {
      const response = await Instance.get(`api/order/show?page=${page}`);
      console.log(response);
      const o = response.data.order;
      const orderArray = o.data;
      setOrder(orderArray);
      console.log(orderArray);
      setPagination({
        currentPage: o.current_page,
        lastPage: o.last_page,
        perPage: o.per_page,
        total: o.total,
      });
      setSuccess(o.message);
    } catch (error) {
      console.log(error);
      setOrder(null);
      setError({ general: error.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  //

  const handlePayDunya = async (e, order) => {
    e.preventDefault();
    setError({});
    try {
      console.log(order);
      const response = await Instance.post(`api/pay/${order.id}`);
      console.log(response);
      const url = response.data.invoice_url;
      window.open(url, "_blank");
      setSuccess(response.data.message);
      setError((prev) => ({ ...prev, [order.id]: null }));
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          const validatorErrors = error.response.data.errors;
          console.log(validatorErrors);
          setError((prev) => ({ ...prev, [order.id]: validatorErrors }));
          e.target.reset();
          setError(data.errors);
          console.warn(data.errors);
        } else {
          setError({ general: data.message || " Something went wrong" });
          console.warn(data);
        }
      } else {
        setError({ general: error.message });
      }
    }
  };

  //
  if (loading) return <div>Loading...</div>;
  if (!order) {
    return (
      <div>
        <Typography textAlign={"center"} color={"error"}>
          Order not found
        </Typography>{" "}
        {success && (
          <Typography textAlign={"center"} color={"green"}>
            {success}
          </Typography>
        )}
        {error.general && <h2>{error.general}</h2>}
      </div>
    );
  }
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      <Box>
        {error.general && (
          <Typography textAlign={"center"} color={"red"}>
            {error.general}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          pb: 4,
          mt:4,
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontSize: {xs:"12px", sm:"50px"} }}
          fontWeight="bold"
          zIndex={1}
        >liste de vos commandes</Typography>
        {order.map((order, key) => (
          <Box key={key}>
            <Typography variant="h5">Order ID: {order.id}</Typography>
            <Typography>
              Date Created: {new Date(order.created_at).toLocaleString()}
            </Typography>
            <Typography>Delivery Method: {order.delivery_method}</Typography>
            <Typography>Payment Method: {order.payment_method}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>Total Amount: ${parseInt(order.total)}</Typography>
            {order.status === "pending" && (
              <Button
                onClick={(e) => handlePayDunya(e, order)}
                variant="contained"
                color="success"
                sx={{ mt: 2, mr: 2 }}
              >
                pay with paydunya
              </Button>
            )}
            <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
              <Table
                sx={{ minWidth: 650, bgcolor: "background.default" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>PRODUCTID</TableCell>
                    <TableCell>ORDERID</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell>QUANTITY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order_items.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.product_id}</TableCell>
                      <TableCell>{item.order_id}</TableCell>
                      <TableCell>{parseInt(item.price)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Pagination
                count={pagination.lastPage}
                page={pagination.currentPage}
                onChange={(e, value) => getOrder(value)}
                color="primary"
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default OrderShow;
