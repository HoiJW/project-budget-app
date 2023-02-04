import './App.scss';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get the database working must import firebase modules
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
import BudgetCards from './Components/BudgetCards';
function App() {
  return(
    <div>
      <h1>My Budgets</h1>
      <button>Add Budget</button>
      <button>Add Expense</button>
      
      <BudgetCards name="Entertainment" amount={150} max={1000}/>
      

    </div>
  )
}

export default App;
