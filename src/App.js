import './App.scss';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get the database working must import firebase modules
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
import Total from './Components/Total';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";

function App() {
  //stating all the items to use for the app
  const [expense, setExpenes] = useState([]);
  const[userInput, setUserInput] = useState('');
  const[title, setTitle] = useState(''); 
  const[userBudget, setUserBudget] = useState('');
  const [v, setV] = useState(0);
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
    //get the info from userinput STATE
    event.preventDefault();
    if (title === "") {
      Swal.fire(
        'No name item',
        'An empty item has been submitted',
        'info'
      )
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
    Swal.fire({
      title: 'Are you sure?',
      text: "the item will deleted permanently",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(remove(dbRef))
      }
    })
    
  }
  //fair base linking set up
  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    //event listenr of firebase for pushing
    onValue(dbRef, (reponse)=>{
      const data = reponse.val();
      const newState = [];
      for (let key in data) {
        newState.push(
          { key:key, 
            amount: parseInt(data[key]['userInput']),
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
  //current we have add expense ✔️
  //need to rescrict to numbers only✔️
  //need to make each expense into own div and can be remove "onClick"✔️
  //need add title into expense✔️
  //need add budget that reflect in Total amount ?✔️
  // scretch goal , adding Color reflect the amounts / Total div✔️
  const color = amount => {
    if (amount >= 1000){return("expense-cards big-red")}
  else if(amount >= 600){return("expense-cards gold")}
  else if(amount >= 450){return("expense-cards raddish")}
  else if(amount >= 200){return("expense-cards purple")}
  else if(amount >= 100){return("expense-cards mint")}
  else if(amount >= 50){return("expense-cards grey")}
  else if(amount >= 0){return("expense-cards")}
    //color css for different amount with dynamic changes
}
  return(
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.1}}
    className="main">
      <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1}}>
      <h1>My Budget</h1>
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
          <button onClick={handleSubmit} disabled={!userInput}>Add Expense</button>
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
      
      
      {/* div return when data pushed to cloud */}
      <div className='contents'>
          {expense.map ( (expense) => {
            const bgName = color(expense.amount)
            const { key, title, amount} = expense
              return (
                <motion.div 
                animate={{ scale: [0.7, 1.5, 1.3 ,1],
                  rotate: [0, -30, 30, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "15px"] }}
                transition={{ duration: 0.4 }}
                
                className={bgName}key={key}>
                  <div>
                    <h2>{title}</h2>
                    <p>${amount}</p>
                    <button onClick={() => {handleRemove(key)}}>
                    remove
                    </button>
                  </div>
                </motion.div>
              )
          })}
      </div>
      <Total sums={total} max={userBudget}/>
      <footer><p>built by Hoi W @2023</p></footer>
    </motion.div>
  )
}

export default App;
