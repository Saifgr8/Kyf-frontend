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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import DashInfo from "../dashboard/DashInfo";
import {
  getCurrentUser,
  removeCurrentUser,
} from "../../utils/CurrentUserDetails";
import { useNavigate, useLocation } from "react-router-dom";

const allPages = [
  {
    title: "Home",
    href: "/app",
  },
  {
    title: "About",
    href: "/app/about",
  },
  {
    title: "Contact",
    href: "/app/contact",
  },
  {
    title: "Dashboard",
    href: "/app/dashboard",
  },
  {
    title: "Recipes",
    href: "/app/recipes",
  },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentPath, setCurrentPath] = React.useState("");

  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

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

  const handleMenuItemClick = (href) => {
    navigate(href);
    setCurrentPath(href);
    handleCloseNavMenu();
  };

  const profileCard = () => {
    return (
      <div>
        <DashInfo />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="outlined"
            sx={{ marginTop: "5px" }}
            onClick={() => handleCloseUserMenu()}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            sx={{ marginTop: "5px" }}
            onClick={() => {
              removeCurrentUser();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  };
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "inherit" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FoodBankIcon
            fontSize="large"
            color="success"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            KYF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
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
              {allPages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => handleMenuItemClick(page.href)}
                  sx={{
                    color: "black",
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      borderBottomColor:
                        currentPath === page.href ? "white" : "inherit",
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <FoodBankIcon
            fontSize="large"
            color="success"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, height: "50px" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            KYF
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", color: "black" },
            }}
          >
            {allPages.map((page) =>
              // Conditionally render the "Dashboard" and "Recipes" menu items based on isLoggedIn
              (page.title === "Dashboard" || page.title === "Recipes") &&
              !currentUser?.isLoggedIn ? null : (
                <Button
                  key={page.title}
                  onClick={() => handleMenuItemClick(page.href)}
                  sx={{
                    my: 2,
                    color: "black",
                    display: "block",
                    ...(currentPath === page.href
                      ? {
                          borderBottom: "2px solid black",
                        }
                      : {
                          borderBottom: "2px solid transparent",
                        }),
                  }}
                >
                  {page.title}
                </Button>
              )
            )}
          </Box>

          {/* //do here */}

          {currentUser?.isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={currentUser?.username}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Saif" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", padding: "0px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {profileCard()}
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              href="/login"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
