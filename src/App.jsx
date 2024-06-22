import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./assets/Signin";
import Signup from "./assets/Signup";
import Appbar from "./assets/Appbar";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#eeeeee",
        }}
      >
        <Router>
          <Appbar />
          <Routes>
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
