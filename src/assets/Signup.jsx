import React from "react";
import Card from "@mui/material/Card";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

function Signup() {
  return (
    <div>
      <div
        style={{
          paddingTop: 200,
          display: "flex",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <Typography variant="h4">Welcome to ProLearner</Typography>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", paddingBottom: 20 }}
      >
        <Typography variant="h6">Lets get you signed in</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "Center",
        }}
      >
        <Card variant="outlined" style={{ width: 400 }}>
          <div
            style={{
              width: 380,
              height: 200,
              padding: 10,
            }}
          >
            <TextField
              id="outlined-required"
              label="Username"
              fullWidth={true}
            />
            <br />
            <br />
            <TextField
              id="outlined-required"
              label="Password"
              fullWidth={true}
              type="password"
            />
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "left",
              }}
            >
              <Button
                style={{
                  width: 380,
                  backgroundColor: "#1976d2",
                  color: "white",
                }}
              >
                SIGNUP
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
