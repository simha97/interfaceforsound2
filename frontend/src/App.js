// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Interface from "./Interface";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Interface />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
