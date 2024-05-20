import './App.css';
import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import CreatePost from './Components/CreatePost/CreatePost';
import { signInWithGoogle, signOutUser } from './Firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const profilePic = localStorage.getItem('profilePic');

    if (name && email && profilePic) {
      setIsLoggedIn(true);
      setName(name);
      setEmail(email);
      setProfilePic(profilePic);
    }
  }, []);

  const handleSignIn = () => {
    return signInWithGoogle()
      .then(() => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const profilePic = localStorage.getItem('profilePic');

        setIsLoggedIn(true);
        setName(name);
        setEmail(email);
        setProfilePic(profilePic);
        navigate('/'); // Redirect to Home after successful sign-in
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    return signOutUser()
      .then(() => {
        setIsLoggedIn(false);
        setName('');
        setEmail('');
        setProfilePic('');
        navigate('/login'); // Redirect to Login after successful sign-out
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className='rootComponent'>
      <nav>
        <Link to='/'>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to='/create'>Create Post</Link>
            <button onClick={handleSignOut} className="navButton">Logout</button>
          </>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </nav>
      <div className="content">
        <Routes>
          <Route path='/' element={<Home userEmail={email} />} /> {/* Pass email as prop */}
          <Route
            path='/login'
            element={
              <Login
                isLoggedIn={isLoggedIn}
                handleSignIn={handleSignIn}
                handleSignOut={handleSignOut}
                name={name}
                email={email}
                profilePic={profilePic}
              />
            }
          />
          <Route
            path='/create'
            element={
              isLoggedIn ? <CreatePost /> : <Navigate to='/login' />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
