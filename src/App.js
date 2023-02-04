import './App.scss';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get the database working must import firebase modules
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
// import BudgetCards from './Components/BudgetCards';
import Total from './Components/Total';
function App() {
  //create books state that will store our database info
  const [budget, setBudget] = useState([]);
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
      // set books stat to reflect database info
      const newState = [];

      for (let key in data) {
        newState.push(
          {key:key, amount: data[key]}
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
      
      setBudget(newState);
    
    });
  
  
  },[]);
  return(
    <div className="titles">
      <h1>My Budgets</h1>
      <form action="submit">
        <label htmlFor="newBudget"></label>
        <input onChange={handleInput} type="text" id="newBudget" value={userInput} />
        <button onClick={handleSubmit}>Add Expense</button>
      </form>
      
      
      <div className='budget-cards'>
        {budget.map ( (budget) => {
          return (
            <div key={budget.key}>
              <p>${budget.amount}</p>
              <button onClick={() => {handleRemove(budget.key)}}>
              remove
              </button>
            </div>
          )

        })}
      </div>

      <Total sums={150} max={1000}/>
      
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
