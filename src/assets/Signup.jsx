import React from "react";
import Card from "@mui/material/Card";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import CustomizedSnackbar from "./CustomStyledComponents/CustomizedSnackBar";
import { useNavigate } from "react-router-dom";


function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function sendData() {
    const response = await fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const message = await response.json();
    localStorage.setItem("Token", message.token);
    if (response.status == 200){
      console.log(message);
      const id = message.id;
      navigate(`/admin/dashboard/${id}`);
    }
    else{
      const err = message.Error.message;
      alert(err);
    }
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
        <Typography variant="h6">Lets get you signed up</Typography>
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
              inputProps={{ minLength: 3, maxLength: 255 }}
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
              inputProps={{ minLength: 8, maxLength: 255 }}
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
                  sendData();
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
