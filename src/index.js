import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <FpjsProvider
    loadOptions={
        {apiKey: "hYySL8bmhw6w6UEenBMv",
        region: "ap"}
    }>
        <App />
        </FpjsProvider>
    </BrowserRouter>
);
