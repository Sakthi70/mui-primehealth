import React, { useState } from "react";
import { Outlet } from "react-router";
import { alpha, styled } from "@mui/material/styles";
import { Backdrop } from "@mui/material";
// import Loader from "../../components/utils/Loader";
import DashboardSidebar from "../../components/SideBar/Sidebar";
import DashboardNavbar from "../../components/Navbar";
import { createLinearGradient, hexToRgbChannel } from "../../theme/styles";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: alpha(theme.palette.primary.light,0.2),
  // backgroundImage:createLinearGradient(hexToRgbChannel(theme.palette.primary.light, true),hexToRgbChannel(theme.palette.primary.dark, true),0.2, 0.7)
}));

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function DoctorLayout() {
  const [open, setOpen] = useState(false);

  const loading = false;

  return (
    <RootStyle>
      <Backdrop
        sx={{
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        {/* <Loader /> */}
      </Backdrop>

      <DashboardNavbar
        isOpenSidebar={open}
        onOpenSidebar={() => setOpen(true)}
      />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={(value: boolean) => setOpen(value)}
      />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
