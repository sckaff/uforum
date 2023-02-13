import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';

export const Homebar = () => {

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <a href='http://localhost:3000/home'><Button color="inherit" startIcon={<MenuIcon />}>Home</Button></a>
                    <a href='http://localhost:3000/'><Button color="inherit" startIcon={<SendIcon />}>Create/View</Button></a>
                </Toolbar>
            </AppBar>
        </Box>
        </>

    )
}
