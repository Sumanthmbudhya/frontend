import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, TextField, Button, Box, FormControlLabel, Checkbox, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const data = { username, password };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", result.token);  // Store token for future use
        navigate("/home");
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("Error during login");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };
 
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: 'blue', boxShadow: 1, height: '60px' }}>
  <Toolbar>
   
          <img src="/images/s.png" alt="logo" width="2%" />
         
        </Toolbar>
      </AppBar>

      <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box sx={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
            <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>Login</Typography>
            {error && <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>{error}</Typography>}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Username" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />} label="Remember me" />
                <Link href="#" variant="body2" sx={{ textDecoration: 'none', color: 'blue' }}>Forgot password?</Link>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link onClick={handleRegisterRedirect} sx={{ cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>Register here</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
