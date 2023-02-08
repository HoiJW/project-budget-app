import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
// import firebase from './firebase';
// import { getDatabase, onValue, push, remove, ref} from 'firebase/database';

const Input = () => { 
    const[userInput, setUserInput] = useState('');
    const[title, setTitle] = useState('');
    const[userBudget, setUserBudget] = useState(''); 
    const [v, setV] = useState(0);
    
    const handleInput = (event) => {
        setUserInput(event.target.validity.valid ? event.target.value :v);
        setV('')
      }
      const handleTitle =(event) => {
        setTitle(event.target.value);
      }
      const handleBudget = (event) => {
        setUserBudget(event.target.validity.valid ? event.target.value :v);
      }
      // const handleSubmit = (event) => {
      //   //get the info from userinput STATE
      //   event.preventDefault();
      //   if (title === "") {
      //     Swal.fire(
      //       'No name item',
      //       'An empty item has been submitted',
      //       'info'
      //     )
      //   }
      //   //send it off to firebase using push function
      //   const database = getDatabase(firebase);
      //   const dbRef = ref(database);
      //   const expense = {userInput:userInput, title:title};
      //   push(dbRef, expense);
      //   setUserInput('');
      //   setTitle('');
      // }
    
    return(
        <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1}}>
      <motion.h1
      whileTap={{rotate: [0, -30, 30, -30, 30, -30, 30, 0]}}
      >My Budget</motion.h1>
      <div className='adding-section'>
        <form className='left' action="submit">
          <label htmlFor="newExpense">Amount:</label>
          <input onChange={handleInput} 
          type="text"
          placeholder="e.g $100"
          id="newExpense"
          pattern='[0-9]*' 
          value={(userInput)}
          />
          <label htmlFor="newTitle">Item:</label>
          <input onChange={handleTitle} 
          type="text"
          placeholder="e.g Food" 
          id="newTitle"
          value={(title)}
          />
          <button 
          // onClick={handleSubmit} 
          disabled={!userInput}>Add Expense</button>
        </form>
        <form className='right' action="" >
          <label htmlFor="newBudget">Your Budget:</label>
          <input onChange={handleBudget} 
          type="text" 
          id="newBudget"
          placeholder="$1000" 
          pattern='[0-9]*' 
          value={(userBudget)}
          />
          <button className='sr-only' disabled={userBudget}>prevent your budget refresh</button>
        </form>
      </div>
      </motion.div>
    )
}

export default Input;