import React, { useEffect, useState } from "react";
import { Instance } from "../../Api/Axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  TextField,
} from "@mui/material";
function Show() {
  const [cart, setCart] = useState([]);
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [cartState, setCartState] = useState(null);
  const getCart = async (page = 1) => {
    setLoading(true);
    try {
      const response = await Instance.get(`api/cart/show?page=${page}`);
      console.log(response);
      const c = response.data.cart;
      console.log(c);
      setCart(c.data);
      setPagination({
        currentPage: c.current_page,
        lastPage: c.last_page,
        perPage: c.per_page,
        total: c.total,
      });
      setSuccess(c.message);
      
    } catch (error) {
      console.log(error);
      setCart(null);
      setError({ general: error.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  const handleEdit = (item) => {
    setEditId(item.id);
    setCartState({ ...item });
  };
  const handleChange = (e) => {
    setCartState({ ...cartState, quantity: e.target.value });
  };
  const handleCancel = () => {
    setEditId(null);
    setCartState(null);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError({});

    try {
      const quantity = cartState.quantity;
      const response = await Instance.post(`api/cart/${cartState.id}/update`, {
        quantity: quantity,
      });
      setCart((prev) =>
        prev.map((item) =>
          item.id === cartState.id
            ? { ...cartState, quantity: cartState.quantity }
            : item
        )
      );
      console.log(response);

      setEditId(null);
      setCartState(null);

      setSuccess(response.data.message);
      setError((prev) => ({ ...prev, [cartState.id]: null }));
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          const validatorErrors = error.response.data.errors;
          console.log(validatorErrors);
          setError((prev) => ({ ...prev, [cart.id]: validatorErrors }));
        } else {
          setError({ general: data.message || " Something went wrong" });
          console.warn(data);
        }
      } else {
        setError({ general: error.message });
      }
    }
  };

  const handleDelete = async (e, cart) => {
    // e.stopPropagation();
    e.preventDefault();
    setError({});
    try {
      const res = await Instance.delete(`api/cart/${cart.id}/delete`);
      console.log(res);
      setSuccess(res.data.message);
      setCart((prev) => prev.filter((item) => item.id !== cart.id));
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
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

  //update order for delivery
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setError({});
    try {
      const total = cart.reduce((sum, item) => {
        const price = Number(item.product?.price || 0);
        const quantity = Number(item.quantity || 0);

        return sum + price * quantity;
      }, 0);
      console.log(total);
      const response = await Instance.post("api/order", {
        total: total,
        status: "pending",
        payment_method: "cash",
        delivery_method: "pickup",
        delivery_address: null,
        delivery_phone: null,
        delivery_email: null,
        delivery_date: null,
        is_delivered: false,
      });
      console.log(response);
      setSuccess(response.data.message);
      setError((prev) => ({ ...prev, [cart.id]: null }));
      setCart(null);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422) {
          const validatorErrors = error.response.data.errors;
          console.log(validatorErrors);
          setError((prev) => ({ ...prev, [cart.id]: validatorErrors }));
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
  if (!cart) {
    return (
      <div>
        <Typography textAlign={"center"} color={"error"}>
          Cart not found
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
      <TableContainer component={Paper} sx={{ mt: 2, mb: 2 }}>
        <Table
          sx={{ minWidth: 650, bgcolor: "background.default" }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">PRODUCTID</TableCell>

              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">QUANTITY</TableCell>
              <TableCell align="right">IMAGE</TableCell>
              <TableCell align="right">ACTION</TableCell>
              <TableCell align="right">PAYDUNYA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right">{item.product_id}</TableCell>
                <TableCell align="right">{item.product.name}</TableCell>
                <TableCell align="right">{item.product.price}</TableCell>
                <TableCell align="right">
                  {editId === item.id ? (
                    <form onSubmit={handleUpdate}>
                      <TextField
                        type="number"
                        min={1}
                        max={10}
                        value={cartState.quantity}
                        name="quantity"
                        onChange={handleChange}
                        style={{
                          width: 60,
                          textAlign: "center",
                          marginRight: 10,
                        }}
                      />
                    </form>
                  ) : (
                    item.quantity
                  )}
                </TableCell>
                <TableCell align="right">
                  <img
                    width={50}
                    height={50}
                    src={item.product.path}
                    alt={item.product.name}
                  />
                </TableCell>

                <TableCell align="right">
                  {editId === item.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mr: 2 }}
                        onClick={handleUpdate}
                      >
                        save
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mr: 2 }}
                        onClick={handleCancel}
                      >
                        cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mr: 2 }}
                        onClick={() => handleEdit(item)}
                      >
                        edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ mr: 2 }}
                        onClick={(e) => handleDelete(e, item)}
                      >
                        delete
                      </Button>
                    </>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 2 }}
                    onClick={(e) => handlePayDunya(e, item)}
                  >
                    pay with paydunya
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          onClick={handleCreateOrder}
        >
          cash on delivery
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          count={pagination.lastPage}
          page={pagination.currentPage}
          onChange={(e, value) => getCart(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default Show;
