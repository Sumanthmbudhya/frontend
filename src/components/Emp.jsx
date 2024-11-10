import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Select, MenuItem, InputLabel, FormLabel, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const Emp = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    designation: '',
    gender: '',
    courses: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      courses: checked
        ? [...prev.courses, value]
        : prev.courses.filter((course) => course !== value),
    }));
  };

  const handleSubmit = () => {
    if (!employee.name || !employee.email || !employee.phoneNumber || !employee.designation || !employee.gender || employee.courses.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const existingEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    const newEmployee = { ...employee, id: existingEmployees.length + 1 };
    localStorage.setItem('employees', JSON.stringify([...existingEmployees, newEmployee]));
    navigate('/Emplist');
  };

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
            <Button color="inherit" sx={{ color: "white" }}component={Link} to="/">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ mx: 'auto', mt: 4 }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <TextField label="Name" fullWidth margin="normal" value={employee.name} name="name" onChange={handleChange} />
            <TextField label="Email" fullWidth margin="normal" value={employee.email} name="email" onChange={handleChange} />
            <TextField label="Phone Number" fullWidth margin="normal" value={employee.phoneNumber} name="phoneNumber" onChange={handleChange} />
            <InputLabel>Designation</InputLabel>
            <Select fullWidth name="designation" value={employee.designation} onChange={handleChange}>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
            </Select>
            <FormLabel>Gender</FormLabel>
            <RadioGroup row name="gender" value={employee.gender} onChange={handleChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <FormLabel>Courses</FormLabel>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="BCA" value="BCA" onChange={handleCheckboxChange} />
              <FormControlLabel control={<Checkbox />} label="MCA" value="MCA" onChange={handleCheckboxChange} />
              <FormControlLabel control={<Checkbox />} label="BSc" value="BSc" onChange={handleCheckboxChange} />
            </FormGroup>
            
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Submit</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Emp;
