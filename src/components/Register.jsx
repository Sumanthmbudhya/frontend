import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, TextField, Button, Box, Container, FormControlLabel, Checkbox, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
    } else {
      const data = { username, email, password };

      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Registration successful!");
          navigate("/"); 
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Error during registration");
      }
    }
  };


  const handleLoginRedirect = () => {
    navigate("/"); 
  };

  return (
    <Box>
     <AppBar position="static" sx={{ backgroundColor: 'blue', boxShadow: 1, height: '60px' }}>
     <Toolbar>
          <img src="/images/s.png" alt="logo" width="2%" />
         
        </Toolbar>
      </AppBar>

      <Container maxWidth="xs" sx={{ marginTop: 5 }}>
        <Box sx={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 3 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 3 }}>
            Register
          </Typography>

          {error && <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>{error}</Typography>}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    color="primary"
                  />
                }
                label="I accept the terms and conditions"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
              >
                Register
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  onClick={handleLoginRedirect}
                  sx={{ cursor: 'pointer', color: 'blue' }}
                >
                  Login here
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
