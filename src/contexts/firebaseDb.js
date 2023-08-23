/* eslint-disable eqeqeq */
import React, { useContext , useState, createContext } from 'react';
import { useAuth } from './authContext';
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  child,
  update
} from "firebase/database";

const DbContext = createContext();

export function useDB(){
    return useContext(DbContext)
}

export function DbProvider({children}) {
  const [booksList, setBooksList] = useState([]);
  // const [wordsList, setWordsList] = useState([]);

  const { currentUser } = useAuth();

  // --------------------- book CRUD ----------------------
  async function getBooks () {
    // setBooksList([]);
    const dbRef = ref(getDatabase());
    // eslint-disable-next-line no-useless-concat
    get(child(dbRef, 'users/' + currentUser.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          setBooksList(snapshot.val().books || []);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function createBook (obj) {
    const db = getDatabase();

    // first get the length of words
    get(child(ref(db), 'users/' + currentUser.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const newWordRef = ref(db, 'users/' + currentUser.uid + '/books/' + (snapshot.val().books.slice(-1)[0].id + 1));
          set(newWordRef, {
              ...obj,
              id: snapshot.val().books.slice(-1)[0].id + 1
            })
            .then(() => {
              console.log('book created successfully!') ;
            })
            .catch((error) => {
              console.log('The note create failed...', error) ;
            });
        } else {
          const newWordRef = ref(db, 'users/' + currentUser.uid + '/books/' + 0);
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

          console.log("first book created");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function deleteBook(bookId) {
    console.log(bookId)
    const db = getDatabase();
    get(child(ref(db), 'users/' + currentUser.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          const newWordRef = ref(db, 'users/' + currentUser.uid);
          console.log(snapshot.val().books.filter(i => i.id != bookId))
          update(newWordRef, {
            ...snapshot.val(),
            books: [ ...snapshot.val().books.filter(i => i.id != bookId) ]
          })
            .then(() => {
              console.log('book deleted successfully!') ;
            })
            .catch((error) => {
              console.log('book deletion failed...', error) ;
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // --------------------- word CRUD ----------------------
  async function createWord (bookId, obj) {
    const db = getDatabase();
    get(child(ref(db), 'users/' + currentUser.uid + '/books/' + bookId))
      .then((snapshot) => {
        if (snapshot.exists() && snapshot.val().words) {
          const newWordRef = ref(db, 'users/' + currentUser.uid + '/books/' + bookId);
          console.log(snapshot.val())
          set(newWordRef,  {
            ...snapshot.val(),
            words:  [ ...snapshot.val().words, { ...obj, id: (snapshot.val().words.slice(-1)[0].id + 1)}]
            })
            .then(() => {
              console.log('word created successfully!') ;
            })
            .catch((error) => {
              console.log('The note create failed...', error) ;
            });
        }else{
          // first word
          const newWordRef = ref(db, 'users/' + currentUser.uid + '/books/' + bookId);
          console.log(snapshot.val())
          update(newWordRef, {
              ...snapshot.val(),
              words: [{ ...obj, id: 0}]
            })
            .then(() => {
              console.log('first word created successfully!') ;
            })
            .catch((error) => {
              console.log('The note create failed...', error) ;
            });
          
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function  deleteWord (bookId, wordId) {
    const db = getDatabase();
    get(child(ref(db), 'users/' + currentUser.uid + '/books/' + bookId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot)
          const newWordRef = ref(db, 'users/' + currentUser.uid + '/books/' + bookId);
          update(newWordRef, {
            ...snapshot.val(),
            words: snapshot.val().words.filter(i => i.id !== wordId)
          })
            .then(() => {
              console.log('word deleted successfully!') ;
            })
            .catch((error) => {
              console.log('deletion failed...', error) ;
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const database = {
    // variables
    booksList,

    // functions
    getBooks,
    createBook,
    deleteBook,

    createWord,
    deleteWord
  }

  return (
    <DbContext.Provider value={database}>
      {children}
    </DbContext.Provider>
  )
}