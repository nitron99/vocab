import React, { useContext , useState, createContext } from 'react';
import { useAuth } from './authContext';
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  child,
  remove
} from "firebase/database";

const DbContext = createContext();

export function useDB(){
    return useContext(DbContext)
}

export function DbProvider({children}) {

  
  const database = {

  }

  return (
    <DbContext.Provider value={database}>
      {children}
    </DbContext.Provider>
  )
}