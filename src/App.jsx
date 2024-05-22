import './App.css';
import { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import CreatePost from './Components/CreatePost/CreatePost';
import { signInWithGoogle, signOutUser, monitorAuthState } from './Firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = monitorAuthState((user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        setIsLoggedIn(true);
        setName(displayName);
        setEmail(email);
        setProfilePic(photoURL);
        localStorage.setItem('name', displayName);
        localStorage.setItem('email', email);
        localStorage.setItem('profilePic', photoURL);
      } else {
        setIsLoggedIn(false);
        setName('');
        setEmail('');
        setProfilePic('');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate('/'); // Redirect to Home after successful sign-in
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
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
