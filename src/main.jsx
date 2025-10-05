import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './i18n.js';

if (window.screen.width > 1280)
  document
    .getElementById("viewport")
    .setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


