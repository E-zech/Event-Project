import { useState, createContext, useEffect } from 'react';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import Navbar from './components/navbar/Navbar.jsx';
import Router from './Router.jsx';
import { useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import Footer from './components/footer/Footer.jsx';


export const GeneralContext = createContext();

export default function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // setLoader(true);
    const fetchData = async () => {
      try {
        if (localStorage.token) {
          const decodedToken = jwtDecode(localStorage.token);
          const userId = decodedToken.tokenUserId;

          const response = await fetch(`http://localhost:5000/user/${userId}`, {
            credentials: 'include',
            headers: {
              'Authorization': localStorage.token,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          console.log(data);
          setUser(data);
          // setUserRoleType(data.roleType);
        } else {
          navigate('/');
          // setLoader(false);
        }
      } catch (error) {
        // Handle fetch or JSON parsing errors here
        console.error('Error fetching user data:', error);
        navigate('/');
        // setLoader(false);
      }
    };

    fetchData();
  }, [localStorage.token]);

  return (
    <>
      <GeneralContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Router />
        <Footer />
      </GeneralContext.Provider>

    </>

  );
}
