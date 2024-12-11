import { Box, Button, Card, Container, Divider, Typography, useTheme } from '@mui/material'
import React from 'react'
import Iconify from '../../components/iconify'
import Waiting from './Waiting'
import { useThemeContext } from '../../theme/theme-provider'

const Dashboard = () => {
    const theme = useTheme();
    const {isElagant} =useThemeContext()
  return (
    
        <Container maxWidth="xl" >
        <Card  elevation={3} sx={{width:1}}>
            <Box display={'flex'} alignItems={'center'} bgcolor={isElagant ?'default':'primary.light'}  p={2} >
            <Iconify
            
            sx={{ width: 24, height: 24, mr: 1,  color: isElagant ?'primary.main':'primary.darker'}}
            icon={
              "uim:clock"
            }
          />
            <Typography color={isElagant ?'primary.main':'primary.darker'} variant='h6'>Waiting Now</Typography>
            </Box>
            <Divider/>
            <Box p={4}>
                <Waiting/>
                <Button sx={{float:'right',my:2}} variant='contained' startIcon={<Iconify
            
            sx={{ width: 16, height: 16,}}
            icon={
              "ic:round-double-arrow"
            }
          />}>See More</Button>
            </Box>
        </Card>
        <Card elevation={3} sx={{width:1, mt:3}} >
            <Box  display={'flex'} alignItems={'center'}  p={2} >
            <Iconify
            
            sx={{ width: 24, height: 24, mr: 1,  color: "primary.main"}}
            icon={
              "solar:calendar-bold-duotone"
            }
          />
            <Typography color='primary' variant='h6'>Scheduled Appointments</Typography>
            </Box>
            <Divider/>
            <Box  p={4} >
                <Waiting isJoin={true}/>
                <Button sx={{float:'right',my:2}} variant='contained' startIcon={<Iconify
            
            sx={{ width: 16, height: 16,}}
            icon={
              "ic:round-double-arrow"
            }
          />}>See More</Button>
            </Box>
        </Card>
        </Container>
  )
}

export default Dashboard