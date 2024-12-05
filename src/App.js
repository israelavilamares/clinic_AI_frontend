import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarHome from './components/Navbar'; // Your Navbar Component
import Home from './components/Home'; // Single Home Component with sections
import Footer from './components/footer';
import Login from './pages/login';
import PagReg from './pages/register';


function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas que incluyen el Navbar y el Footer */}
        <Route path="/*"
          element={
            <>
              <NavbarHome />
              <Home />
              <Footer />
            </>
          }
        />

        <Route path="/login" element=
        {
          <> 
            <Login /> <Footer />
          </>
        } />

      <Route path='/register' element=
        {
         <PagReg /> 
       
        }/>
    
      </Routes>
    </Router>
  );
}

export default App;