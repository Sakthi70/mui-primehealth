
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';
import React from 'react';


const Iconify = ({ icon, sx, ...other }: any) => {
    return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}

export default Iconify
