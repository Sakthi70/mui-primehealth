// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// components
//
import React from 'react';
import Iconify from '../iconify';
import AccountMenu from './Account';
import logo from '../../assets/prime.webp'
import Settings from './Settings';
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const BASE_WIDTH = 90;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)<{ open: boolean }>(({ theme, open }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${(open ? DRAWER_WIDTH : BASE_WIDTH) + 1}px)`,
    },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));

// ----------------------------------------------------------------------


export default function DashboardNavbar({ onOpenSidebar, isOpenSidebar }: any) {
    return (
        <RootStyle open={isOpenSidebar}>
            <ToolbarStyle>
                <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
                    <Iconify icon="eva:menu-2-fill" />
                </IconButton>
                <Box sx={{display: { lg: 'none' }}}>
                <img src={logo} width={80} alt={'logo'}/>
                </Box>
                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                    <Settings/>
                    <AccountMenu />
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    );
}
