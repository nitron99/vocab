import React from "react";
import Router from './routes/routes';

import { AuthProvider } from './contexts/authContext';
import { DbProvider } from './contexts/firebaseDb';

import './App.scss';
import './firebase';

import styles from "./global.scss";

function App() {
  return (
    <div style={{ backgroundColor: styles['bg_primary'] }}>
      <AuthProvider>
        <DbProvider>
          <Router />
        </DbProvider> 
      </AuthProvider>
    </div>
  );
}

export default App;
