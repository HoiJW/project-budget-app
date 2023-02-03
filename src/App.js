import './App.scss';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get the database working must import firebase modules
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
function App() {
    //create books state that will store our database info
    const [books, setBooks] = useState([]);
    // get useEffect fucntion to run side effects on component mounts
    
    // create a statful value thats bound to input
    const[userInput, setUserInput] = useState('');

    //add event listener that fires everytune there is a change in our input

    const handleInput = (event) => {
      setUserInput(event.target.value);
    }
    
    const handleSubmit = (event) => {
      //get the info from userinput STATE
      event.preventDefault();
      console.log(userInput);
      //send it off to firebase using push function
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      
      push(dbRef, userInput);

      setUserInput('');
      
    }
    
    const handleRemove = (bookId) => {
      const database = getDatabase(firebase);
      const dbRef = ref(database, `${bookId}`);
      remove(dbRef);
    }
    
    useEffect( () => {
      // get a variable that holds our database details
      const database = getDatabase(firebase);
      // create a varible that makes a refernce to our database
      const dbRef = ref(database);
      // get database info on load or on change
      // use event listner built in firebase aka onValue
      
      onValue(dbRef, (reponse)=>{
        // use firebase's val() to prase our database info into the format we need
        const data = reponse.val();
        // set books stat to reflect database info
        const newState = [];

        for (let key in data) {
          newState.push(
            {key:key, name: data[key]}
          );
          // 1. make an object {}
          // 2. build a property called "key" that has a value of the object's key
          // 3. build a property called "name" that has a value of the key's value
          // OR
          // turn this:
          //   -NMjX1ECjIWGzAx7Beps: "By Crom!"
          // into this:
          //  {
          //   key: -NMjX1ECjIWGzAx7Beps,
          //   name: "By Crom!"
          //  }
        }
        
        setBooks(newState);
      
      });
    
    
    },[]);
  
  
  return (
    <div className="">
      <form action="submit">
        <label htmlFor="newBook">Add a book to your bookshelf</label>
        <input onChange={handleInput} type="text" id="newBook" value={userInput} />
        <button onClick={handleSubmit}>Add Book</button>
      </form>
      
      
      <ul>
        {books.map ( (book) => {
          return (
            <li key={book.key}>
              <p>{book.name}</p>
              <button onClick={() => {handleRemove(book.key)}}>
              remove!
              </button>
            </li>
          )

        })}
      </ul>
    </div>
  );
}

export default App;
