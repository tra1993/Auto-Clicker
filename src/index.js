import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ကျွန်ုပ်တို့ ဖန်တီးထားသော App.jsx component ကို import လုပ်သည်

// React 18+ တွင် App ကို စတင် Render လုပ်သည့် အဓိက code
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// မှတ်ချက်: မိုဘိုင်း အသုံးပြုမှုအတွက် touch event များအားလုံးကို App.jsx အတွင်း၌ စီမံထားပါသည်။
