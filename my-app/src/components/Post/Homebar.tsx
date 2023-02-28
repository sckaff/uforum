import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import { createSvgIcon } from '@mui/material/utils';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';


const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
    'Home',
);

export const Homebar = () => {
    
    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button color="inherit" startIcon={<HomeIcon />} href="http://localhost:3000/home">Home</Button>
                    <Button color="inherit" startIcon={<SendIcon />} href="http://localhost:3000/">Create/View</Button>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button color="inherit" startIcon={<SendIcon />} href="http://localhost:3000/login">Log In</Button>
                    </Box>
                    <IconButton href="http://localhost:3000/profile" sx={{ p: 0 }}>
                        <Avatar src="/broken-image.jpg" />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
        </>
        
    )
}
