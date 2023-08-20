import React from "react";
import Router from './routes/routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from './contexts/authContext';
import { DbProvider } from './contexts/firebaseDb';

import './App.scss';
import './firebase';

import styles from "./global.scss";

const theme = createTheme({
  palette: {
    error: {
      main: styles['main']
    }
  },
  typography: {
    fontFamily: "Noto Sans, sans-serif"
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: styles['bg_primary'],
          color: "white"
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#c9c9c9"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderColor: "#c9c9c9"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px"
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: styles['bg_primary'] }}>
        <AuthProvider>
          <DbProvider>
            <Router />
          </DbProvider> 
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
