import React, { useContext } from "react";
import carData from "../Mockdata.json";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CardActions,
  Box,
} from "@mui/material";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import RemoveIcon from "@mui/icons-material/Remove";
import UserContext from "../context/UserContext";

const ProductItem = () => {
  const { count, setCount, cartItems, addItemToCart, removeItemFromCart } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleAddCart = (id) => {
    if (carData.find(item => item.id === id)?.quantity > (cartItems[id] || 0)) {
      setCount(count + 1);
      addItemToCart(id);
    } else {
      alert(`no more items available`);
    }
  };

  const handleSubtractCart = (id) => {
    setCount(count - 1);
    removeItemFromCart(id);
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ my: 3 }}>
      {carData?.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              alt="Car Image"
              height="200"
              image={data?.image_url}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {data.car_name} of {data.car_brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: Rs.{data.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {data.quantity}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => navigate(`/products/${data.id}`)}
              >
                Learn more
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                size="small"
                onClick={() => handleAddCart(data.id)}
              >
                Add to Cart <AddCircleTwoToneIcon />
              </Button>
              {cartItems[data.id] && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleSubtractCart(data.id)}
                >
                  Remove <RemoveIcon />
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductItem;
