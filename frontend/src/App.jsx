import { useState, createContext, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import Router from './Router.jsx';
import Login from './auth/Login';
import Footer from './components/footer/Footer.jsx';


export const GeneralContext = createContext();

export default function App() {
  return (
    <>
      <Navbar />
      <Router />
      <Footer />
    </>

  );
}


// <GeneralContext.Provider> 

// </GeneralContext.Provider>