import './App.scss';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get the database working must import firebase modules
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
import Total from './Components/Total';

function App() {
  //create expense state that will store our expenses info
  const [expense, setExpenes] = useState([]);
  //create buget state to hold our budget info
  // const[budget, setBudget] = useState(0);
  // // get useEffect fucntion to run side effects on component mounts
  
  // create a statful value thats bound to input
  const[userInput, setUserInput] = useState('');
  //set up numbers only rescurtion 
  
  
  const[title, setTitle] = useState('');
  
  const[userBudget, setUserBudget] = useState('2500');
  //set up numbers only rescurtion and not insync with val for expense
  const [v, setV] = useState(0);
  
  const[total, setTotal] = useState(0);

  //add event listener that fires everytune there is a change in our input

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
    if (userInput === "") {
      alert("you've submited an empty amount");
    }
    //send it off to firebase using push function
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    const expense = {userInput:userInput, title:title};
    push(dbRef, expense);
    setUserInput('');
    setTitle('');
  }

  // const handleSubmitBudget = (event) => {
  //   //get the info from userinput STATE
  //   event.preventDefault();
  //   console.log(userBudget);
  //   //send it off to firebase using push function
  //   const database = getDatabase(firebase);
  //   const dbRef = ref(database);
  //   const budget = {userBudget:userBudget};
  //   push(dbRef, budget);
  //   setUserBudget('');
  // }
  
  
  const handleRemove = (expenseId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database, `${expenseId}`);
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
        newState.push(
          { key:key, 
            amount: parseInt(data[key]['userInput']),
            title:data[key]['title'],
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
          
        );
      }
      let newTotal = 0;
      newState.forEach((object) => {
        newTotal = newTotal + object['amount']
        // console.log(newTotal);
      })

      // const newBudget = [];
      // for (let budgetkey in data) {
      //   console.log(newBudget);
      //   newBudget.push(
      //     {key:budgetkey ,budget:parseInt(data[budgetkey]['userBudget'])
      //   }
          
      //   );
        
      // }
      setExpenes(newState);
      // setBudget(newBudget);
      setTotal(newTotal);
    });
    
  
  },[]);

  //current we have add expense ✔️
  //need to rescrict to numbers only✔️
  //need to make each expense into own div and can be remove "onClick"✔️
  //need add title into expense✔️
  
  //need add budget that reflect in Total amount ?✔️
  
  // scretch goal , adding Color reflect the amounts / Total div
  // const [bgc, setBgc] = useState("total green")
  // useEffect(() => {


  const color = amount => {
    console.log(amount);
    if (amount >= 1000){return("expense-cards big-red")}
  else if(amount >= 600){return("expense-cards gold")}
  else if(amount >= 450){return("expense-cards raddish")}
  else if(amount >= 200){return("expense-cards purple")}
  else if(amount >= 100){return("expense-cards mint")}
  else if(amount >= 50){return("expense-cards grey")}
  else if(amount >= 0){return("expense-cards")}

}
    

  return(
    <div className="main">
      <h1>My Budgets</h1>
      <div className='adding-section'>
      <form className='left' action="submit">
        <label htmlFor="newExpense">Amount:</label>
        <input onChange={handleInput} 
        type="text"
        placeholder="$100"
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
        <button onClick={handleSubmit}>Add Expense</button>
      </form>
      
      <form className='right' >
        <label htmlFor="newBudget">Your Budget:</label>
        <input onChange={handleBudget} 
        type="text" 
        id="newBudget"
        placeholder="$1000" 
        pattern='[0-9]*' 
        value={(userBudget)}
        />
        
        {/* <button onClick={handleSubmitBudget}>Add Budget</button> */}
      </form>
      </div>
      
      <div className='contents'>
          {expense.map ( (expense) => {
            const bgName = color(expense.amount)
              return (
                <div className={bgName}
                key={expense.key}>
                <div >
                  <h2>{expense.title}</h2>
                  <p>${expense.amount}</p>
                  <button onClick={() => {if (window.confirm('Are you sure you wish to delete this item?'))handleRemove(expense.key)}}>
                  remove
                  </button>
                </div>
                </div>
              )

      })}
      </div>

      <Total sums={total} max={userBudget}/>
      <footer><p>built by Hoi W @2023</p></footer>
      
    </div>
    
  )
}

export default App;
