import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
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
