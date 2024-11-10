import React, { useEffect, useState } from 'react';
import { Box, Grid, AppBar, Toolbar, Button, Table, TableBody, TableCell, TableContainer, TableHead, Typography,  TableRow, Paper, TextField } from '@mui/material';
import { useNavigate,Link } from "react-router-dom";

const Emplist = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.gender.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEmpRedirect = () => {
    navigate("/Emp");
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '100vh' }}>
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
        <Grid item xs={12}>
          <Box sx={{ padding: '20px', backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <Box sx={{ backgroundColor: 'yellow', padding: '10px' }}>Employee List</Box>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                <Box>Total Count: {filteredEmployees.length}</Box>
                <Button sx={{ marginLeft: 2 }} onClick={handleEmpRedirect}>Create Employee</Button>
                <TextField
                  sx={{ marginLeft: 2 }}
                  label="Search"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Box>
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="employee table">
                <TableHead>
                  <TableRow>
                    <TableCell>Unique Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile No</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Course</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phoneNumber}</TableCell>
                      <TableCell>{employee.designation}</TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>{employee.courses.join(', ')}</TableCell>
                      <TableCell>
                        <Button sx={{ marginRight: 1 }} onClick={() => navigate('/Emp')}>Edit</Button>
                        <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Emplist;
