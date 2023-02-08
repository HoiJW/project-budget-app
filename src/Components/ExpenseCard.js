import { motion } from "framer-motion";
const ExpenseCards = ({expenseData,handleRemove}) => {
    //color css for different amount with dynamic changes
    const color = amount => {
        if (amount >= 1000){return("expense-cards big-red")}
      else if(amount >= 600){return("expense-cards gold")}
      else if(amount >= 450){return("expense-cards raddish")}
      else if(amount >= 200){return("expense-cards purple")}
      else if(amount >= 100){return("expense-cards mint")}
      else if(amount >= 50){return("expense-cards grey")}
      else if(amount >= 0){return("expense-cards")}
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
                onClick={() => {handleRemove(key)}}
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