import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Analytics, Home, Logout, Settings } from '@mui/icons-material';
import { BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const AdminSideBar = ({ tab, setTab }) => {

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };
const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate('/signin')
  }

  return (
    <div className="flex">
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div className="p-4">
          <List>
            <ListItem button onClick={() => handleTabChange("home")} sx={{ mb: 6 }}>
              <ListItemIcon>
                <Home className="h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleTabChange("analytics")} sx={{ mb: 6 }}>
              <ListItemIcon>
                <Analytics className="h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <ListItem button onClick={() => handleTabChange("settings")} sx={{ mb: 6 }}>
              <ListItemIcon>
                <Settings className="h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button onClick={() => handleTabChange("users")} sx={{ mb: 6 }}>
              <ListItemIcon>
                <BiUser className="h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            <ListItem button onClick={() => handleLogout()} sx={{ mb: 6 }}>
              <ListItemIcon>
                <Logout className="h-6 w-6" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSideBar;
