import { useState, useEffect } from 'react';
//alret and motion framewares
import Swal from 'sweetalert2';
import { motion } from "framer-motion";

// to get the database working must import firebase modules
// import firebase from './firebase';
import { getDatabase, onValue, push, remove, ref} from 'firebase/database';

const ExpenseCards = ({expenseData}) => {
     //event listener for removing {expnese by id}
    //  const handleRemove = (expenseId) => {
    //     const database = getDatabase(firebase);
    //     const dbRef = ref(database, `${expenseId}`);
    //     Swal.fire({
    //       title: 'Are you sure?',
    //       text: "the item will deleted permanently",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         Swal.fire(
    //           'Deleted!',
    //           'Your file has been deleted.',
    //           'success'
    //         ).then(remove(dbRef))
    //       }
    //     })
        
    //   }
    
    
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
      <div className='contents'>
      {expenseData.map ( (expense) => {
        const bgName = color(expense.amount)
        const { key, title, amount} = expense
          return (
            <motion.div 
            animate={{ scale: [0.7, 1.5, 1.3 ,1],
              rotate: [0, -30, 30, 0],
              borderRadius: ["20%", "20%", "50%", "50%", "15px"] }}
            transition={{ duration: 0.4 }}
            whileHover={{rotate: [0, -30, 30, 0]}}
            drag
        dragConstraints={{
        top: -1,
        left: -1,
        right: 1,
        bottom: 1,
        }}
            
            className={bgName}key={key}>
              <div>
                <h2>{title}</h2>
                <p>${amount}</p>
                <button 
                // onClick={() => {handleRemove(key)}}
                >
                remove
                </button>
              </div>
            </motion.div>
          )
      })}
  </div>
    )
}

export default ExpenseCards;