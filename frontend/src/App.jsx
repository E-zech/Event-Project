import { useState, createContext, useEffect } from 'react';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import Navbar from './components/navbar/Navbar.jsx';
import Router from './Router.jsx';
import { useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import Footer from './components/footer/Footer.jsx';
import { RoleTypes } from './utils.jsx';


export const GeneralContext = createContext();

export default function App() {
  const [user, setUser] = useState();
  const [userRoleType, setUserRoleType] = useState(RoleTypes.none);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserRoleType(RoleTypes.none)
    navigate('/');
    snackbar('You have been successfully logged out');
  };

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
          setUserRoleType(data.roleType);
          console.log(data.roleType)
        } else {
          navigate('/');
          // setLoader(false);
        }
      } catch (error) {
        // Handle fetch or JSON parsing errors here
        console.error('Error fetching user data:', error);
        logout();
        navigate('/');
        // setLoader(false);
      }
    };

    fetchData();
  }, [localStorage.token]);

  return (
    <>
      <GeneralContext.Provider value={{ user, setUser, logout, userRoleType, setUserRoleType }}>
        <Navbar />
        <Router />
        <Footer />
      </GeneralContext.Provider>

    </>

  );
}
