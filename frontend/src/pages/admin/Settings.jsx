import React from 'react';
import { 
  Button, 
  Switch, 
  FormControlLabel, 
  TextField, 
  Divider, 
  Typography, 
  Checkbox, 
  FormGroup 
} from '@mui/material';

const Settings = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* General Settings */}
      <div className="mb-8">
        <Typography variant="h4" className="mb-4">General Settings</Typography>
        <Divider />
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Dark Mode" />
        </FormGroup>
      </div>

      {/* Account Settings */}
      <div className="mb-8">
        <Typography variant="h4" className="mb-4">Account Settings</Typography>
        <Divider />
        <TextField label="Username" fullWidth className="mb-4" />
        <TextField label="Email" fullWidth className="mb-4" />
        <TextField label="Password" type="password" fullWidth className="mb-4" />
        <TextField label="Confirm Password" type="password" fullWidth className="mb-4" />
        <Button variant="contained" color="primary" className="mr-4">Save Changes</Button>
      </div>

      {/* Notification Settings */}
      <div className="mb-8">
        <Typography variant="h4" className="mb-4">Notification Settings</Typography>
        <Divider />
        <FormControlLabel control={<Checkbox />} label="Email Notifications" />
        <FormControlLabel control={<Checkbox />} label="Push Notifications" />
      </div>

      {/* Admin Settings */}
      <div className="mb-8">
        <Typography variant="h4" className="mb-4">Admin Settings</Typography>
        <Divider />
        <FormGroup>
          <FormControlLabel control={<Switch />} label="Admin Access" />
        </FormGroup>
      </div>

      {/* About */}
      <div>
        <Typography variant="h4" className="mb-4">About</Typography>
        <Divider />
        <Typography variant="body1" className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sagittis ante nec ligula pharetra, ac ultrices sapien pharetra.
        </Typography>
      </div>
    </div>
  );
}

export default Settings;
