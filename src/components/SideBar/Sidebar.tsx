import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { alpha, styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  IconButton,
} from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import navConfig from "./NavConfig";
import NavSection from "./NavSection";
import Scrollbar from "../Scrollbar/Scrollbar";
import arrow from "../../assets/arr024.svg";
import Logo from "../logo";
import { createLinearGradient, hexToRgbChannel } from "../../theme/styles";
import { useThemeContext } from "../../theme/theme-provider";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const BASE_WIDTH = 90;

const RootStyle = styled("div")<{ open: boolean }>(({ theme, open }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: open ? DRAWER_WIDTH : BASE_WIDTH,

    transition: "all .3s ease-in",
  },
}));


export default function DashboardSidebar({
  isOpenSidebar,
  onCloseSidebar,
}: any) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  const theme = useTheme();

  const {isElagant}=useThemeContext();

  const show = !isDesktop || isOpenSidebar;

  useEffect(() => {
    if (isOpenSidebar && !isDesktop) {
      onCloseSidebar(false);
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        
        <Logo open={show} />
      </Box>

      <NavSection
        navConfig={navConfig}
        isMin={show}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle
     sx={{position:'relative'}}
      open={isOpenSidebar}
     
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={() => onCloseSidebar(!isOpenSidebar)}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: show ? DRAWER_WIDTH : BASE_WIDTH,
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              borderRightStyle: "dashed",
              ...(isElagant ? { backgroundColor: alpha(theme.palette.background.default, 0.8)}:{ backgroundColor: alpha(theme.palette.primary.light,0.4)})
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      {isDesktop && (
          <IconButton
            size="medium"
            onClick={() => onCloseSidebar(!isOpenSidebar)}
            sx={{ position:'absolute', top: 20, right:-20, zIndex:10000 }}
          >
            <img
              src={arrow}
              width={20}
              style={{
                // transition: "all .1s ease-in",
                transform: isOpenSidebar ? "rotate(3.142rad)" : "rotate(0)",
              }}
            />
          </IconButton>
        )}
    </RootStyle>
  );
}
