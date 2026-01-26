import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/global.css';
import 'bootstrap/dist/css/bootstrap.css';

import { LanguageProvider } from './context/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<React.StrictMode>
<BrowserRouter>
<AuthProvider>
<LanguageProvider>
<App />
</LanguageProvider>
</AuthProvider>
</BrowserRouter>
</React.StrictMode>
);