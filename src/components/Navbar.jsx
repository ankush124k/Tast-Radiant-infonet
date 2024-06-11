import React, { useContext } from "react";
import { AppBar, Badge, Box, Toolbar, Typography, IconButton, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import UserContext from "../context/UserContext";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const { count } = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Radiant Infonet
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={count} color="secondary">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="logout"
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
