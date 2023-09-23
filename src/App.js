import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import About from "./pages/About";
// import Home from "./pages/Home";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Blog />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} /> */}
        {/* path="*" fonctionne si jamais l'url ne correspond à rien de déclaré au dessus */}
        <Route path="*" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
