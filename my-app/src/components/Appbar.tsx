import React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import { createSvgIcon } from '@mui/material/utils';
import Button from '@mui/material/Button';
import {Link } from "react-router-dom";

const HomeIcon = createSvgIcon(
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
    'Home',
);

export default function Appbar() {
return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Link to="/">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        sx={{ mr: 2 }}
                    > 
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Link to="/Login">
                <Button color="inherit">Login</Button>
                </Link>
            </Toolbar>
        </AppBar>
    </Box>
)
}