const ExpenseCards = ({expenseData,handleRemove}) => {
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
                onClick={() => {handleRemove(key)}}
                >
                remove
                </button>
              </div>
            </motion.div>
          )
      })}
}
export default ExpenseCards;