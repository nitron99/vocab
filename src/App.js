import React from "react";
import Router from './routes/routes';

import { AuthProvider } from './contexts/authContext';
import { DbProvider } from './contexts/firebaseDb';

import './App.css';
import './firebase';

function App() {
  return (
    <div>
      <AuthProvider>
        <DbProvider>
          <Router />
        </DbProvider> 
      </AuthProvider>
    </div>
  );
}

export default App;
