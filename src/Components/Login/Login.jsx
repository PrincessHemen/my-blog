import React from 'react';
import './Login.css';

const Login = ({ isLoggedIn, handleSignIn, handleSignOut, name, email, profilePic }) => {
  return (
    <div className='login'>
      {!isLoggedIn && <p>Sign In with Google to Continue</p>}
      {isLoggedIn ? (
        <>
          <div>
            <img src={profilePic} alt="Profile" />
            <p>{name}</p>
            <p>{email}</p>
          </div>
          <button className='login-button' onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <button className='login-button' onClick={handleSignIn}>Sign In With Google</button>
      )}
    </div>
  );
}

export default Login;
