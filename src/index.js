import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

ReactDOM.render(
    <GoogleOAuthProvider clientId="358435942165-o2brrk8papl2ee94qhls05i2okaquga8.apps.googleusercontent.com">
       <BrowserRouter>
         <React.StrictMode>
           <App />
         </React.StrictMode>
      </BrowserRouter>
    </GoogleOAuthProvider>,
    document.getElementById('root')
);