import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Logintest from "./Logintest";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/logintest" element={<Logintest />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
