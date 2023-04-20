import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NurseHome from "./components/NurseHome";
import Patient from "./components/PatientHome";
import AddVitalSigns from "./components/patient/AddVitalSigns";
import Checklist from "./components/patient/Checklist";
import EmergencyAlert from "./components/patient/EmergencyAlert";
import MotivationalVideos from "./components/patient/MotivationalVideos";
import Game from "./components/patient/Game";
import CreateMotivationalTip from "./components/nurse/CreateMotivationalTip";
import ShowMotivationalTip from "./components/nurse/ShowMotivationalTip";
import PatientInfo from "./components/nurse/PatientInfo";
import AddVitals from "./components/nurse/AddVitals";
import ShowEmergencyAlert from "./components/nurse/ShowEmergencyAlert";
import { Result } from "antd";



function App() {
  const userRole = localStorage.getItem("userRole");
  console.log(userRole);

  return (
    <div>
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">PRM System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/logout" className="mr-0">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/nurse" element={<NurseHome />} />
          // /nurse
          <Route
            path="/nurse/createMotivationalTip"
            element={<CreateMotivationalTip />}
          />
          <Route
            path="/nurse/showMotivationalTip"
            element={<ShowMotivationalTip />}
          />
          <Route path="/nurse/patientinfo" element={<PatientInfo />} />
          <Route path="/nurse/addvitals" element={<AddVitals />} />
          <Route path="/nurse/alerts" element={<ShowEmergencyAlert />} />
          // /patient
          <Route path="/patient" element={<Patient />} />
          <Route path="/patient/addvitals" element={<AddVitalSigns />} />
          <Route path="/patient/checklist" element={<Checklist />} />
          <Route path="/patient/emergenctAlert" element={<EmergencyAlert />} />
          <Route
            path="/patient/motivationalVideos"
            element={<MotivationalVideos />}
          />
          <Route path="/patient/tiktaktoe" element={<Game />} />
          <Route path="/patient/result" element={<Result label="1"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
