import './App.scss';
import { useState, useEffect } from 'react';
//alret and motion framewares
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

// to get the database working must import firebase modules
import firebase from './firebase';
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';

//jsx components
import Input from './Components/Input';
import ExpenseCards from './Components/ExpenseCard';
import Total from './Components/Total';

function App() {
  //stating all the items to use for the app
  const [expense, setExpenes] = useState([]);
  const[total, setTotal] = useState(0);
  
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
 
  return(
    <motion.div 
    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1}} className="main">
      <Input expense={expense} />
      <ExpenseCards expenseData={expense} handleRemove={handleRemove} />  
      <Total sums={total} />
      <footer><p>built by Hoi W @2023</p></footer>
    </motion.div>
  )
}

export default App;
