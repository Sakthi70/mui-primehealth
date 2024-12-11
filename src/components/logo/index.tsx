import { Box, ListItemText } from "@mui/material";
import logo from "../../assets/pl.webp";
import logoF from "../../assets/prime.webp";
import React from "react";

const Logo = ({ open = true }) => {
  return (
    <Box display={"flex"}>
      {open ?<img height={60} width={200} src={logoF} alt="logo" /> :<img width={50} src={logo} alt="logo" />}
     
    </Box>
  );
};

export default Logo;
