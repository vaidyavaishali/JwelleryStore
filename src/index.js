import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import 'react-toastify/dist/ReactToastify.ccss'
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ProductProvider } from './Context/store';
import {PayPalScriptProvider} from "@paypal/react-paypal-js"
// PayPalScriptProvider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <HelmetProvider>
        <BrowserRouter>
          <PayPalScriptProvider >
            <App />
          </PayPalScriptProvider>

        </BrowserRouter>
      </HelmetProvider>

    </ProductProvider>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
