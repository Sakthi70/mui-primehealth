import React, { ReactNode, useState } from "react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router";
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
  Typography,
} from "@mui/material";
import Iconify from "../iconify";
import { useThemeContext } from "../../theme/theme-provider";

export interface MyProps extends ListItemButtonProps {
  children?: ReactNode | ReactNode[];
  component?: any;
  to?: any;
  open: boolean;
}

export const ListItemStyle = styled((props: MyProps) => (
  <ListItemButton disableGutters {...props} />
))(({ theme, open }) => ({
  ...theme.typography.body2,
  // height: 48,
  position: "relative",
  textTransform: "capitalize",
  justifyContent: open ? "flex-start" : "center",
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
}));

export const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

function NavItem({ item, active, isMin }: any) {
  const theme = useTheme();

  const {isElagant} =useThemeContext();
  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev: boolean) => !prev);
  };

  const activeRootStyle = {
    color:  "secondary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.secondary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          open={isMin}
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={
              open
                ? "eva:arrow-ios-downward-fill"
                : "eva:arrow-ios-forward-fill"
            }
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: { title: any; path: any }) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  open={isMin}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: "flex",
                        borderRadius: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "text.disabled",
                        transition: (theme) =>
                          theme.transitions.create("transform"),
                        ...(isActiveSub && {
                          transform: "scale(2)",
                          bgcolor: "primary.main",
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      open={isMin}
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot ? activeRootStyle : {color: isElagant ?   theme.palette.text.secondary:  theme.palette.text.primary,}),
      }}
    >
      <Box sx={{display:'flex', flexDirection:'column', gap:0.5, alignItems:'center'}}>

      <ListItemIconStyle >
        {icon && icon}
      </ListItemIconStyle>
      {!isMin && <Typography variant="caption" fontSize={10} fontWeight={600} >{title}</Typography>}
      </Box>
      {isMin && <ListItemText disableTypography primary={title} />}
      {isMin && info && info}
    </ListItemStyle>
  );
}

export default function NavSection({ navConfig, isMin, ...other }: any) {
  const { pathname } = useLocation();

  const match = (path: any) =>
    path ? !!matchPath({ path, end: true }, pathname) : false;

  return (
    <Box {...other}>
      <List
        disablePadding
        sx={{
          p: 0.5,
        }}
      >
        {navConfig.map((item: { title: any }) => (
          <NavItem key={item.title} item={item} active={match} isMin={isMin} />
        ))}
      </List>
    </Box>
  );
}
