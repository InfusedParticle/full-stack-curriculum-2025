import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  // Access the MUI theme for potential theme-related functionalities.
  // const theme = useTheme();

  // TODO: Extract login function and error from our authentication context.
  const { loginError, login, register } = useAuth();

  // State to hold the username and password entered by the user.
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // TODO: Handle login function.
  const handleLogin = () => {
    if(isRegistering) {
      register(username, password);
    } else {
      login(username, password);
    }
  };

  const handleRegister = () => {
    setIsRegistering(!isRegistering);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            marginBottom: 2,
            height: 200,
            width: 200,
          }}
          alt="UT Longhorn"
          src="/longhorn.jpg"
        ></Box>
        <Typography component="h1" variant="h4" fontWeight="bold">
          {isRegistering ? "Register" : "Login" }
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            InputLabelProps={{ shrink: true }}
            placeholder="email@domain.com"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            InputLabelProps={{ shrink: true }}
            placeholder="racecar"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            {isRegistering ? "Register" : "Login" }
          </Button>
        </Box>
        <Button onClick={handleRegister}>
          { isRegistering ? "Back to login" : "Register a new account" }
        </Button>
        {/* TODO: Display Login Error if it exists */}
        { loginError && (
          <Alert severity="error">
            {loginError}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default LoginPage;
