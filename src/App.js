import React from 'react';
import UserList from './Components/UserList/UserList';
import ReactDOM from "react-dom";
import UserDetails from './Components/UserDetails/UserDetails';
import { BrowserRouter, Route, Routes, Link, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
