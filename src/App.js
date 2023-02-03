import './App.scss';
import { useState, useEffect } from 'react';
import firebase from './firebase';
// to get the database working must import firebase modules
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';
function App() {
  return(
    <div>
      <h1>My Budgets</h1>
    </div>
  )
}

export default App;
