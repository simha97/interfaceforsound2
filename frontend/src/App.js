// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FormPage from "./FormPage";
import QuestionsPage from "./QuestionsPage";
import Sounds from "./Sounds";
import SoundChoice from "./SoundChoice";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/form" element={<FormPage />} />
          <Route path="/q" element={<QuestionsPage />} />
          <Route path="/sounds" element={<Sounds />} />{" "}
          <Route path="/choice" element={<SoundChoice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
