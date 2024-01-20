import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './Components/AuthForms/LoginForm';
import SignupForm from './Components/AuthForms/SignupForm';
import MLAComponent from './Components/UserComponents/MLAComponent';
import MPComponent from './Components/UserComponents/MPComponent';
import CIComponent from './Components/UserComponents/CIComponent';
import SIComponent from './Components/UserComponents/SIComponent';
import DIComponent from './Components/UserComponents/DIComponent';
import MemComponent from './Components/UserComponents/MemComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/mla/:id" element={<MLAComponent />} />
        <Route path="/mp/:id" element={<MPComponent />} />
        <Route path="/ci/:id" element={<CIComponent />} />
        <Route path="/si/:id" element={<SIComponent />} />
        <Route path="/di/:id" element={<DIComponent />} />
        <Route path="/member/:id" element={<MemComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;