import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoutes from './protectedRoutes';
import PublicRoutes from './publicRoutes';

// routes
import AuthPage from "../views/authPage/AuthPage";
import HomePage from '../views/homePage/HomePage';
import CreatePage from '../views/createPage/CreatePage';
import PractisePage from '../views/practisePage/PractisePage';

const routes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PublicRoutes/>} >
        <Route path="/" element={<AuthPage />}/>
      </Route>
      <Route path="/" element={<ProtectedRoutes/>} >
        <Route path="/home" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
        <Route path="/practise" element={<PractisePage />}/>
      </Route>
    </Routes>
  </Router>
)

export default routes