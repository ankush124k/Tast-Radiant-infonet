import React, { useState, useEffect, useContext } from "react";
import carData from "../Mockdata.json";
import { useParams, Link } from "react-router-dom";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid } from "@mui/material";
import UserContext from "../context/UserContext";

export default function ProductPage() {
  const [filteredCar, setFilteredCar] = useState(null);
  const { count, setCount, addItemToCart } = useContext(UserContext);
  const { id } = useParams();

  const filterCarById = (id) => {
    const carId = parseInt(id);
    const filtered = carData.find((car) => car.id === carId);
    setFilteredCar(filtered);
  };

  useEffect(() => {
    filterCarById(id);
  }, [id]);

  const handleAddCart = () => {
    setCount(count + 1);
    addItemToCart(id);
  };

  return (
    <Container sx={{ paddingTop: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {filteredCar && (
        <Card sx={{ maxWidth: 1000, width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="300"
                image={filteredCar.image_url}
                alt="Car Image"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h4" align="center" sx={{ my: 2 }}>
                  {filteredCar.car_name}
                </Typography>
                <Typography variant="h6" align="center" sx={{ my: 1 }}>
                  Brand: {filteredCar.car_brand}
                </Typography>
                <Typography variant="body1" sx={{ my: 2 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </Typography>
                <Typography variant="h4" sx={{ my: 3 }}>
                  Specifications:
                </Typography>
                <Typography>
                  <b>Engine:</b> {filteredCar.specifications.engine}
                </Typography>
                <Typography>
                  <b>Power:</b> {filteredCar.specifications.power}
                </Typography>
                <Typography>
                  <b>Top Speed:</b> {filteredCar.specifications.top_speed}
                </Typography>
                <Typography>
                  <b>Acceleration:</b> {filteredCar.specifications.acceleration}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }}>
                  Price: Rs. {filteredCar.price}
                </Typography>
                <Button
                  onClick={handleAddCart}
                  variant="contained"
                  sx={{ mt: 3, mr: 2 }}
                >
                  Add to Cart <AddCircleTwoToneIcon sx={{ ml: 1 }} />
                </Button>
                {/* "Move to Cart" button */}
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/cart"
                  sx={{ mt: 3 }}
                >
                  Move to Cart
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
}
