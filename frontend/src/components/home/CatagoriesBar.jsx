import React from 'react';
import { Link } from 'react-router-dom';
import {List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const CategoriesBar = () => {
    return (
        <div
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    backgroundColor: '#f3f4f6' // Set your desired background color
                },
            }}
        >
            <List>
                <ListItem disablePadding className="pl-5 p-2 w-full font-bold bg-lb">
                    <ListItemText primary="Collections" />
                </ListItem>
                <ListItemButton component={Link} to="/products/catagory/paintings/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Paintings" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/pottery/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Pottery" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/glass/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Glass" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/home-decor/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Home Decor" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/garden/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Garden" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/fabric/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Fabric" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/wood/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Wood" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/fine-craft/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Fine Craft" />
                </ListItemButton>
                <ListItemButton component={Link} to="/products/catagory/personalization/" className="my-2" sx={{ borderRadius: '8px' }}>
                    <ListItemText primary="Personalization" />
                </ListItemButton>
            </List>
        </div>
    );
}

export default CategoriesBar;
