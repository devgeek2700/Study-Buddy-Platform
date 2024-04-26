import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-siaqsck52z25chz1.us.auth0.com"
    clientId="WZ1DXUTwph56uOUsD26zs8GlFxEJgClM"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);

reportWebVitals();
