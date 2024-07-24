import React from "react";
import Card from "@mui/material/Card";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const response = fetch("http://localhost:3000/admin/signin", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username, password }),
      headers: { "Content-type": "application/json" },
    });
    const message = await response.json();
    console.log(message);
  }
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
        <Card variant="elevation" style={{ width: 400, padding: 20 }}>
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
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              id="outlined-required"
              label="Password"
              fullWidth={true}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
                onClick={() => {
                  login();
                }}
              >
                LOGIN
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
