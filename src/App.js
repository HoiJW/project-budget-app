//base step up with firebase and useState
import { useState, useEffect } from 'react';
import firebase from './firebase';
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
//importing style libraries
import './App.scss';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
//importing Compnents
import ExpenseCards from './Components/ExpenseCard';
import Total from './Components/Total';

function App() {
  //stating all the items to use for the app that using data from firebase
  const [expense, setExpenes] = useState([]);
  const[userInput, setUserInput] = useState('');
  const[title, setTitle] = useState(''); 
  const[userBudget, setUserBudget] = useState('');
  const [v, setV] = useState(0.0);
  const[total, setTotal] = useState(0);
  //event listener upon form submition
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
  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === "") {
      Swal.fire('No name item','An empty item has been submitted','info')
    }
    //send it off to firebase using push function
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const expense = {userInput:userInput, title:title};
    push(dbRef, expense);
    setUserInput('');
    setTitle('');
  }
  //event listener for removing {expnese by id}
  const handleRemove = (expenseId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${expenseId}`);
    Swal.fire({title: 'Are you sure?',text: "the item will deleted permanently",icon: 'warning',showCancelButton: true,confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!','Your file has been deleted.','success'
        ).then(remove(dbRef))
      }
    })  
  }
  //linking firebase
  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (reponse)=>{
      const data = reponse.val();
      const newState = [];
      for (let key in data) {
        newState.push(
          { key:key, 
            amount: parseFloat(data[key]['userInput']),
            title:data[key]['title'],
        })};
      let newTotal = 0;
      newState.forEach((object) => {
        newTotal = newTotal + object['amount']
      })
      setExpenes(newState);
      setTotal(newTotal);
    });
  },[]);
  return(
    <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}transition={{ duration: 1.1}} className="main">
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}transition={{ duration: 1}}>
        <motion.h1 whileTap={{rotate: [0, -30, 30, -30, 30, -30, 30, 0]}}>My Budget</motion.h1>
        <div className='adding-section'>
          <form className='left' action="submit">
            <label htmlFor="newExpense">Amount:</label>
            <input onChange={handleInput} type="text" placeholder="e.g $100" id="newExpense" pattern='[0.0-9.9]*' value={(userInput)}/>
            <label htmlFor="newTitle">Item:</label>
            <input onChange={handleTitle} type="text" placeholder="e.g Food" id="newTitle" value={(title)}/>
            <button onClick={handleSubmit} disabled={!userInput}>Add Expense</button>
          </form>
          <form className='right' action="" >
            <label htmlFor="newBudget">Your Budget:</label>
            <input onChange={handleBudget} type="text" id="newBudget" placeholder="$1000" pattern='[0.0-9.9]*' value={(userBudget)}/>
            <button className='sr-only' disabled={userBudget}>prevent your budget refresh</button>
          </form>
        </div>
        </motion.div>
      <ExpenseCards expenseData={expense} handleRemove={handleRemove} />  
      <Total sums={total} max={userBudget}/>
      <footer><div className='footer'><p>built by Hoi W @2023</p></div></footer>
    </motion.div>
  )
}

export default App;