import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import{register} from './serviceWorker.mjs';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

register();
