import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Iconify from '../../components/iconify';
import { Box, Button, Card, Collapse, Grid2, IconButton, TableCell, TableRow, TextField, Typography, useTheme } from '@mui/material';

const CustomTable = ({isJoin=false}) => {
    const theme = useTheme();

    const getColor =(id:number)=>{
        return id ===1? theme.palette.error.main : id ===2 ? theme.palette.warning.main: theme.palette.success.main
    }

    const getColorByName =(id:number)=>{
        return id ===1? 'error' : id ===2 ? 'warning': 'success'
    }

    const data = [
        {
            id: 1,
            name: 'John Doe',
            type: 'Regular Checkup',
            notes: 'Health problem with cough The patient reports persistent cough for the past week, associated with mild chest discomfort. Recommended follow-up in 1 week if symptoms persist.',
            time: '16:30',
            age: 30,
            email: 'johndoe@prm.com',
            location: 'Melbourne'
        },
        {
            id: 2,
            name: 'Jane Smith',
            type: 'Regular Checkup',
            notes: 'Health problem with cough The patient reports persistent cough for the past week, associated with mild chest discomfort. Recommended follow-up in 1 week if symptoms persist.',
            time: '17:30',
            age: 45,
            email: 'janesmith@prm.com',
            location: 'Newyork'
        },
        {
            id: 3,
            name: 'John Doe',
            type: 'Regular Checkup',
            notes: 'Health problem with cough The patient reports persistent cough for the past week, associated with mild chest discomfort. Recommended follow-up in 1 week if symptoms persist.',
            time: '18:30',
            age: 30,
            email: 'johndoe@prm.com',
            location: 'Melbourne'
        },
        {
            id: 4,
            name: 'Jane Smith',
            type: 'Regular Checkup',
            notes: 'Health problem with cough The patient reports persistent cough for the past week, associated with mild chest discomfort. Recommended follow-up in 1 week if symptoms persist.',
            time: '19:30',
            age: 45,
            email: 'janesmith@prm.com',
            location: 'Newyork'
        }
    ]
        ;

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                Cell: ({ cell }: any) => (
                    <Box color={'secondary.main'} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: 'bold'
                    }}>
                        <Iconify icon={'line-md:person-twotone'} sx={{ width: 20, height: 20 }} />
                        {cell.getValue()}
                    </Box>
                ),
            },
            {
                accessorKey: 'type',
                header: 'Email',
                muiTableBodyCellProps: {
                    sx: {
                        fontWeight: 600
                    }
                }
            },
            {
                accessorKey: 'notes',
                header: 'Department',
                muiTableBodyCellProps: {
                    sx: {
                        overflow: 'hidden',
                        maxWidth: 150,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            textOverflow: 'ellipsis',
                        }
                    }
                }
            },
            {
                accessorKey: 'time',
                header: 'Department',
                Cell: ({ cell,row }: any) => {
                    return <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: 'bold',
                    color: getColor(row.original.id)
                }}>
                    <Iconify icon={'uim:clock'} sx={{ width: 20, height: 20}} />
                    {cell.getValue()}
                </div>}
                ,
                muiTableBodyCellProps: {
                    align: 'center' as any,
                }
            },
            {
                accessorKey: 'action',
                header: 'Department',
                Cell: ({row }:any) => (
                    <>
                        <IconButton  color={getColorByName(row.original.id) }  sx={{ display: { sm: 'none' } }}>
                            <Iconify icon={isJoin? 'lets-icons:phone-duotone': 'icon-park-twotone:check-one'} />
                        </IconButton>
                        <Button color={getColorByName(row.original.id) }  sx={{ display: { xs: 'none', sm: 'inherit' }  }} variant='outlined'>{isJoin ? "Join" : "Accept"}</Button>
                    </>
                ),
                muiTableBodyCellProps: {
                    align: 'center' as any,
                    sx: {
                        width: { xs: 50, sm: 'auto' },
                        minWidth: { xs: 50, sm: 'auto' },
                    }
                },

            }
        ],
        []
    );

    const parentRef:any = useRef(null);
    const [parentWidth, setParentWidth] = useState(0);
    useEffect(() => {
      const handleResize = () => {
        if (parentRef.current) {
          setParentWidth(parentRef.current.offsetWidth);
        }
      };
  
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box ref={parentRef}>
        <MaterialReactTable
            columns={columns}
            data={data}
            enableExpanding
            enableTopToolbar={false}
            enableBottomToolbar={false}
            initialState={{
                columnPinning: {
                    left: ['mrt-row-expand', 'name'],
                    right: ['action']
                }
            }}
            muiTableHeadRowProps={() => ({
                sx: {
                    display: 'none'
                }
            })}
           
            muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleExpandedHandler(),
                sx: {
                    cursor: 'pointer',
                    backgroundColor: '#fff',
                },
            })}
            renderDetailPanel={({ row }) => (
                <Card  elevation={1} sx={{ p: 2,maxWidth:parentWidth, width:parentWidth - 30}}>
                    <Grid2 container spacing={2} gap={2}>
                        <DetailCol size={{xs:6,lg:4}} title={'Name'} value={row.original.name} />
                        <DetailCol size={{xs:6,lg:4}} title={'Age'} value={row.original.age} />
                        <DetailCol size={{xs:6,lg:4}} title={'Email'} value={row.original.email} />
                        <DetailCol size={{xs:6,lg:4}} title={'Service Type'} value={row.original.type} />
                        <DetailCol size={{xs:6,lg:4}} title={'Time'} value={row.original.time} />
                        <DetailCol size={{xs:6,lg:4}} title={'Location'} value={row.original.location} />
                        <Grid2 sx={{ mt: 1 }} size={12}>
                            <TextField slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            label={'Notes'} fullWidth multiline value={row.original.notes} />
                        </Grid2>
                    </Grid2>
                </Card>
            )}
        />
        </Box>
    );
};



export const DetailCol = ({ size, title, value }: any) => {
    return (
        <Grid2 size={size}>
            <Typography color='textSecondary' variant='body2' sx={{ mb: 1 }}>{title}</Typography>
            <Typography variant='subtitle2' fontWeight={600}>{value}</Typography>
        </Grid2>
    )
}


export default CustomTable;