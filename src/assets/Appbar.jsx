import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import {useState, useEffect} from "react";
export default function Header() {
  const[isUserActive, setIsUserActive] = useState(null);

  useEffect(()=>{
    async function fetchData(){
      const token = localStorage.getItem("token");
      const response = await fetch("http:localhost:3000/admin/check", { 
        method : "GET",
        mode :"cors",
        headers:{
          "Content-Type" : "application/json",
          "authorization" : `Bearer ${token}`
         }})
         const isLoggedIn = await response.json();
         if(isLoggedIn) setIsUserActive(isLoggedIn.username);

    }
    fetchData();
  },[])

  if(isUserActive){
    return (
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
              ProLearner
            </Typography>
            <div>{isUserActive}</div>
            
            <Button
              color="inherit"
              onClick={() => {
                window.location = "/signup";
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
  else{
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
