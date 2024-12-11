import { alpha, Box, Drawer, Grid2, IconButton, Paper, Switch, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import Iconify from '../iconify'
import { ListItemIconStyle, ListItemStyle } from '../SideBar/NavSection';
import { useThemeContext } from '../../theme/theme-provider';
import { fontFamilies, primaryColors } from '../../theme/create-theme';

const Settings = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const {primaryColor,setPrimaryColor,mode,toggleMode,toggleElagant,isElagant,secondaryColor,setSecondaryColor,setFontFamily,fontFamily} = useThemeContext();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton color='primary' onClick={toggleDrawer}><Iconify icon={'lets-icons:setting-line-duotone'} /></IconButton>
            <Drawer
                anchor='right'
                open={open}
                onClose={toggleDrawer}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0,0)'
                        }
                    }
                }}
            >
                <Box sx={{ width: 350, p: 2 }}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography flexGrow={1} variant='h6'>Settings</Typography>
                        <Iconify onClick={toggleDrawer} sx={{ width: 24, height: 24, cursor: 'pointer' }} icon={'ci:close-sm'} />
                    </Box>
                    <Grid2 container spacing={2} gap={2} my={2}>
                                <Grid2  size={6}>
                                    <Paper variant='outlined' sx={{p:2, display:'flex',  justifyContent:'center', alignItems:'center'}} >
                                    <Switch color='primary' checked={isElagant} onChange={toggleElagant} size="small" />
                                    <ListItemIconStyle><Iconify sx={{color:isElagant ? 'primary.main': 'grey'}} icon={'material-symbols-light:view-in-ar-outline'} width={22} height={22} /></ListItemIconStyle>
                                    </Paper>
                                </Grid2>
                            </Grid2>
                            <Typography variant='subtitle2' mt={3}>Primary</Typography>
                            <Paper variant='outlined'  sx={{ width: 1, p: 3,borderRadius:2, mb:3 }}>
                                <Grid2 container spacing={2} gap={2}>
                                    {Object.keys(primaryColors).map((color) => 
                                            <Grid2 key={color} size={4}>
                                            <Box borderRadius={1} p={2} onClick={() => setPrimaryColor(color as any)} sx={{
                                                color: primaryColors[color as keyof typeof primaryColors][mode].main ,
                                                cursor:'pointer',
                                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                ...(color !== primaryColor ? {} : {
                                                    bgcolor: alpha(
                                                            theme.palette.primary.main,
                                                            theme.palette.action.selectedOpacity
                                                        ),
                                                })                                            }}>

                                                <ListItemIconStyle><Iconify icon={'solar:window-frame-bold-duotone'} width={28} height={28} /></ListItemIconStyle>
                                            </Box>
                                            </Grid2>
                                    )}
                                </Grid2>
                            </Paper>

                            <Typography variant='subtitle2' mt={3}>Secondary</Typography>
                            <Paper variant='outlined'  sx={{ width: 1, p: 3,borderRadius:2, mb:3 }}>
                                <Grid2 container spacing={2} gap={2}>
                                    {Object.keys(primaryColors).map((color) => 
                                            <Grid2 key={color} size={4}>
                                            <Box borderRadius={1} p={2} onClick={() => setSecondaryColor(color as any)} sx={{
                                                color: primaryColors[color as keyof typeof primaryColors][mode].main ,
                                                cursor:'pointer',
                                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                ...(color !== secondaryColor ? {} : {
                                                    bgcolor: alpha(
                                                            theme.palette.secondary.main,
                                                            theme.palette.action.selectedOpacity
                                                        ),
                                                })                                            }}>

                                                <ListItemIconStyle><Iconify icon={'solar:window-frame-bold-duotone'} width={28} height={28} /></ListItemIconStyle>
                                            </Box>
                                            </Grid2>
                                    )}
                                </Grid2>
                            </Paper>
                            <Typography variant='subtitle2' mt={3}>Font Family</Typography>
                            <Paper variant='outlined'  sx={{ width: 1, p: 3,borderRadius:2, mb:3 }}>
                            <Grid2 container spacing={2} gap={2}>
                                {Object.keys(fontFamilies).map(font =>
                                <Grid2 key={font} size={6}>
                                    <Paper variant='elevation' elevation={fontFamily === font ? 1:0} onClick={() => setFontFamily(font as keyof typeof fontFamilies)} sx={{p:2, display:'flex', flexDirection:'column',cursor:'pointer',  justifyContent:'center', alignItems:'center'}} >
                                    <ListItemIconStyle><Iconify sx={{color:fontFamily === font ? 'primary.main': 'grey'}} icon={'ph:text-aa-duotone'} width={22} height={22} /></ListItemIconStyle>
                                    <Typography fontWeight={600} variant='subtitle2' color={fontFamily === font ? 'black':'grey'} fontFamily={fontFamilies[font  as keyof typeof fontFamilies]}>{font}</Typography>
                                    </Paper>
                                </Grid2>)}
                            </Grid2>
                            </Paper>
                </Box>
            </Drawer>
        </>
    )
}

export default Settings