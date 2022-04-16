import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './components/Authorization/LoginPage/Login';
import Registration from './components/Authorization/RegistrationPage/Registration';
import { store } from './redux/redux';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/mainPage" element={<MainPage />}></Route>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter >
  );
}

export default App;
