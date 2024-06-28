import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Account from './components/pages/Account';
import CRM from './components/pages/CRM';
import EMG from './components/pages/EMG';
import MyEvents from './components/pages/MyEvents';

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/event-management" element={<EMG />} />
                <Route path="/my-account" element={< Account />} />
                <Route path="/user-management" element={< CRM />} />
            </Routes>
        </>
    )
};


