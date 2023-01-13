import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoteState from "./context/notes/NoteState";
import AuthState from "./context/auth/AuthState";

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import Alert from "./components/Alert";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <AuthState>
          <NoteState>
            <Navbar />
            <div style={{height: "2rem"}}>
              <Alert />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </NoteState>
        </AuthState>
      </Router>
    </>
  );
}

export default App;
