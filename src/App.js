import './App.scss';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get the database working must import firebase modules
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
// import BudgetCards from './Components/BudgetCards';
import Total from './Components/Total';
function App() {
  //create Budget state that will store our database info
  const [budget, setBudget] = useState([]);
  // get useEffect fucntion to run side effects on component mounts
  
  // create a statful value thats bound to input
  const[userInput, setUserInput] = useState('');
  const[title, setTitle] = useState('');
  const [val, setVal] = useState(0);
  const[total, setTotal] = useState(0);

  //add event listener that fires everytune there is a change in our input

  const handleInput = (event) => {
    setUserInput(event.target.value);
    setVal((v) => (event.target.validity.valid ? event.target.value :v))
  }
  const handleTitle =(event) => {
    setTitle(event.target.value);
  }

  

  const handleSubmit = (event) => {
    //get the info from userinput STATE
    event.preventDefault();
    console.log(userInput);
    //send it off to firebase using push function
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const expense = {userInput:userInput, title:title};
    push(dbRef, expense);
    setUserInput('');
  }

  
  
  const handleRemove = (budgetId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${budgetId}`);
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
      // set Budget stat to reflect database info
      const newState = [];
      for (let key in data) {
        console.log(data[key]['userInput']);
        newState.push(
          {key:key, amount: parseInt(data[key]['userInput']),
          title:data[key]['title']
        }
          
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
      let newTotal = 0;
      newState.forEach((object) => {
        newTotal = newTotal + object['amount']
        console.log(newTotal);
      })

      let newBudget = 0;
      newState.forEach((object) => {
        newTotal = newBudget + object['amount']
        console.log(newTotal);
      })
      setBudget(newState);
      setTotal(newTotal);
    });
  
  
  },[]);
  //current we have add expense ✔️
  //need to rescrict to numbers only✔️
  //need to make each expense into own div and can be remove "onClick"✔️
  //need add title into expense✔️
  
  //need add budget that reflect in Total amount ?
  //expense cant be added if larger than Total

  //make a variable "sum" to sum up the current expenses

  // scretch goal , adding progress bar to Total div

  

  
  return(
    <div className="main">
      <h1>My Budgets</h1>
      <form action="submit">
        <label htmlFor="newBudget"></label>
        <input onChange={handleInput} 
        type="text" 
        id="newBudget"
        pattern='[0-9]*' 
        value={(userInput, val)}
        />
        
        <label htmlFor="newTitle"></label>
        <input onChange={handleTitle} 
        type="text" 
        id="newTitle"
        value={(title)}
        />
        <button onClick={handleSubmit}>Add Expense</button>
      </form>
      
      <div className='contents'>
          {budget.map ( (budget) => {
              return (
                <div className='budget-cards'>
                <div key={budget.key}>
                  <h3>{budget.title}</h3>
                  <p>${budget.amount}</p>
                  <button onClick={() => {handleRemove(budget.key)}}>
                  remove
                  </button>
                </div>
                </div>
              )

      })}
      </div>

      <Total sums={total} max={1500}/>
      
      {/* <div className='budget-cards'>
            <div className="titles">
                <h2>{name}</h2>
                <h3>${amount} / <span className="max">${max}</span> </h3>
            </div>
            
            <div className="progress-bar">
            </div>
        </div> */}
    </div>
    // <div>
    //   <h1>My Budgets</h1>
    //   <button>Add Budget</button>
    //   <button>Add Expense</button>
      
    //   <BudgetCards name="Entertainment" amount={150} max={1000}/>
      
    //   <Total sums={150} max={1000}/>

    // </div>
  )
}

export default App;
