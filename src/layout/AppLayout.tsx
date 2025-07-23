import React from "react";
import { NavLink, Outlet } from "react-router";
import { Box, styled, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Library from "./components/Library";
import LibraryHead from "./components/LibraryHead";
import Navbar from "./components/Navbar";

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
});

const Sidbar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "20px",
  marginBottom: "8px",
  marginRight: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  margin: "10px 0px",
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,
  },
}));

const AppLayout: React.FC = () => {
  return (
    <Layout>
      <Sidbar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox height="100%">
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidbar>
      <ContentBox
        style={{
          margin: "0px 8px",
        }}
      >
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;
