import React from 'react';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
     
      <AppBar position="static" sx={{ backgroundColor: 'blue', boxShadow: 1, height: '60px' }}>
  <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      <img src="/images/s.png" alt="logo" width="2%" />
    </Typography>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button color="inherit" sx={{ color: "white" }} component={Link} to="/home">Home</Button>
      <Button color="inherit" sx={{ color: "white" }} component={Link} to="/Emplist">Employee List</Button>
      <Button color="inherit" sx={{ color: "white" }} component={Link} to="/Emp">Create Employee</Button>
      <Button color="inherit" sx={{ color: "white" }}  component={Link} to="/">Logout</Button>
    </Box>
  </Toolbar>
</AppBar>
<Grid container spacing={2}>
  <Grid item xs={6} md={12}>
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography variant="h4">Welcome to Admin Panel</Typography>
      </Box>
  </Grid>
</Grid>
      
    </Box>
  );
};

export default Home;
