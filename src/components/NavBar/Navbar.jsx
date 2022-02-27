import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Badge, createTheme, Icon, ThemeProvider } from "@mui/material";
import { Logout, ShoppingCart } from "@mui/icons-material";
import logo from "./../../images/logo.png";
import { ClientContext } from "../../context/ClientProvider";
import { AuthContext } from "../../context/AuthProvider";

const pages = ["Catalog", "Admin panel", "Избранное"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { cartCount } = React.useContext(ClientContext);
  const { authWithGoogle, user, logout } = React.useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <img style={{ width: "50px" }} src={logo} alt="" />
              </Typography>
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", textDecoration: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
              <Link to="/catalog">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  Catalog
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
              <Link to="/admin-panel">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Admin panel
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
              <Link to="/addProduct">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Add product
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrrow: 0 }}>
              <Link to="/cart">
                <IconButton sixe="large" color="inherit">
                  <Badge color="error" badgeContent={cartCount} />
                  <ShoppingCart />
                </IconButton>
              </Link>
              {user ? (
                <>
                  <IconButton size="small" color="inherit">
                    {user.displayName}
                  </IconButton>
                  <IconButton sx={{ p: 0 }}>
                    <Avatar alt={user.displayName} src={user.photoURL} />
                  </IconButton>
                  <IconButton onClick={logout} size="large" color="inherit">
                    <Logout />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  onClick={authWithGoogle}
                  size="small"
                  color="inherit"
                >
                  Login
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Navbar;
