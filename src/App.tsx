import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import Logintest from "./test/Logintest";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Profile from "./Profile";
import PostReview from "./PostReview";
import Detail from "./Detail";

function App() {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/logintest" element={<Logintest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {auth ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/new" element={<PostReview />} />
              <Route path="/detail/:book_id" element={<Detail />} />
            </>
          ) : (
            <Route path="*" element={<Navigate replace to="/login" />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
