import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
export default function Header() {

  const [isUserActive, setIsUserActive] = useState();

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:3000/admin/check", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      const isLoggedIn = await response.json();
      console.log("From App Bar : ", isLoggedIn);
      if (isLoggedIn.username) setIsUserActive(isLoggedIn.username);
      // console.log("From App Bar : ", isUserActive)
    }
    fetchData();
  }, []);

  if (isUserActive) {
    const user = isUserActive;
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
              ProLearner
            </Typography>
            <div>{`Hi ${user}`}</div>

            <Button
              color="inherit"
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/login";
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
              ProLearner
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                window.location = "/login";
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                window.location = "/signup";
              }}
            >
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
