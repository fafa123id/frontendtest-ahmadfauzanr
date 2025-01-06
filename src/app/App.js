import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IdeasPage from "./Pages/IdeasPage";
import Header from "./components/Header";
import Banner from "./components/Banner";
import WorkPage from "./Pages/WorkPage";
import AboutPage from "./Pages/AboutPage";
import ServicePage from "./Pages/ServicePage";
import ContactPage from "./Pages/ContactPage";
import CareersPage from "./Pages/CareersPage";
import "./output.css";

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element={<IdeasPage />} />
          <Route path="/ideas" element={<IdeasPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
