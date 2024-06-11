import React, { useContext } from "react";
import carData from "../Mockdata.json";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const { cartItems, addItemToCart, removeItemFromCart, setCount, count } =
    useContext(UserContext);

  const cartProducts = carData.filter((data) => cartItems[data.id]);

  const handleAddCart = (id) => {
    setCount(count + 1);
    addItemToCart(id);
  };

  const handleSubtractCart = (id) => {
    setCount(count - 1);
    removeItemFromCart(id);
  };

  



  const addCommasToNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateTotalPrice = (id, price) => {
    let numInt = parseInt(price);
    var totalAmt = cartItems[id] * numInt;
    return addCommasToNumber(totalAmt);
  };
  
  const calculateTotalAmount = () => {
    const totalAmount = cartProducts.reduce((total, product) => {
      return total + cartItems[product.id] * Number(product.price);
    }, 0);
    // Format the total amount to include commas
    return addCommasToNumber(totalAmount.toFixed(2));
  };
 

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {cartProducts.length > 0 ? (
        <>
          <Typography variant="h4" gutterBottom>
            Your Cart
          </Typography>
          <Grid container spacing={2} direction="column">
            {cartProducts.map((data) => (
              <Grid item key={data.id}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                  <CardMedia
                    component="img"
                    alt={data.car_name}
                    height="140"
                    image={data.image_url}
                    sx={{ width: 140 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      mx: 2,
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {data.car_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Brand: {data.car_brand}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: Rs.{data.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total: Rs.{calculateTotalPrice(data.id, data.price)}
                      </Typography>
                    </CardContent>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mx: 2 }}>
                    <Button
                      size="large"
                      onClick={() => handleSubtractCart(data.id)}
                    >
                      <RemoveIcon />
                    </Button>
                    <Typography
                      variant="h3"
                      color="text.secondary"
                      sx={{ mx: 2 }}
                    >
                      {cartItems[data.id]}
                    </Typography>
                    <Button size="large" onClick={() => handleAddCart(data.id)}>
                      <AddCircleTwoToneIcon />
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Typography variant="h5">
              Total Amount to be paid: Rs.{calculateTotalAmount()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, bgcolor: "purple", "&:hover": { bgcolor: "darkviolet" } }}
          >
            Buy Now
          </Button>
        </>
      ) : (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="h6" gutterBottom>
            Add some items to your cart to see them here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/products"
            sx={{ mt: 2, bgcolor: "purple", "&:hover": { bgcolor: "darkviolet" } }}
          >
            Continue to buy
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
