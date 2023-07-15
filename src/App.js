import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import AllRoutes from './AllRoutes';
import './App.css'


function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            {profile && profile.name ? (
                <div  className='profile'>
                  <div className='header'> 
                    <img src={profile.picture} alt="userImage" />
                    <div className='intro'>
                      <p>Hello, {profile.name}</p>
                      <p>{profile.email}</p>
                    </div>
                    <button className='signout' onClick={logOut}>Log out</button>
                  </div>
                  <div className='body'>
                    <AllRoutes/>
                 </div>  
                </div>
            ) : (
                <div className='logout'>
                <div className='head'>
                    <img className='headImg' src='https://res.cloudinary.com/duxhjspsf/image/upload/v1689355836/mainlogo_oyyc7d.jpg' alt='iitBhuLogo'/>
                </div>
                <div className='fbody'>
                  <div className='box1'>
                    <h2 className='quotes'>WELCOME TO IIT BHU</h2>
                      <h1 className='quotes'>Find-It</h1>
                    <p>Discover a hassle-free way to recover your lost items within our campus. Browse, post, and connect with fellow students to reunite with your belongings. Start searching now!</p>   
                    <button className='sign' onClick={() => login()}>Sign in with Google</button>
                  </div>
                </div>
                </div>
            )}
        </div>
    );
}
export default App;