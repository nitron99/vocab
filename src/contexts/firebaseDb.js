import React, { useContext , useState, createContext } from 'react';
import { useAuth } from './authContext';
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  child
} from "firebase/database";

const DbContext = createContext();

export function useDB(){
    return useContext(DbContext)
}

export function DbProvider({children}) {
  const [wordsList, setWordsList] = useState([]);

  const { currentUser } = useAuth();

  // --------------------- functions ----------------------
  async function getAllWords () {
    setWordsList([]);
    const dbRef = ref(getDatabase());
    // eslint-disable-next-line no-useless-concat
    get(child(dbRef, 'users/' + currentUser.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          setWordsList(snapshot.val().words || []);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } 

  async function createWord (obj) {
    const db = getDatabase();

    // first get the length of words
    get(child(ref(db), 'users/' + currentUser.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const newWordRef = ref(db, 'users/' + currentUser.uid + '/words/' + (snapshot.val().words.slice(-1)[0].id + 1));
          set(newWordRef, {
              ...obj,
              id: snapshot.val().words.slice(-1)[0].id + 1
            })
            .then(() => {
              console.log('word created successfully!') ;
            })
            .catch((error) => {
              console.log('The note create failed...', error) ;
            });
        } else {
          const newWordRef = ref(db, 'users/' + currentUser.uid + '/words/' + 0);
          set(newWordRef, {
              ...obj,
              id: 0
            })
            .then(() => {
              console.log('word created successfully!') ;
            })
            .catch((error) => {
              console.log('The note create failed...', error) ;
            });

          console.log("first note created");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function updateWord () {

  }

  async function  deleteWord () {

  }

  const database = {
    // variables
    wordsList,

    // functions
    getAllWords,
    createWord,
    updateWord,
    deleteWord
  }

  return (
    <DbContext.Provider value={database}>
      {children}
    </DbContext.Provider>
  )
}