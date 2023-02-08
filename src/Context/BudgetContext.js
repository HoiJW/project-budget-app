// import React, { useContext, useState } from "react"


// const BudgetsContext = React.createContext()
// export function useBudgets(){
//     return useContext(BudgetsContext)
// }

// export const BudgetsProvider = ({ children}) => {
//     const [budgets, setBudgets] = useState([])
//     const [expense, setExpense] = useState([])

//     function getBudgetExpense (budgetId){
//         return expense.filter( expense )
//         // => expense.budgetId === budgetID
//     }
//     function addExpense ({ description, amout, budgetId }){
//         setExpense(prevExpense => {
//             return [...prevExpense, { description, amout, budgetId }]  
//         })
//     }
    
//     function addBudget ({ name,max}){
//         setBudgets(prevBudgets => {
//             if (prevBudgets.find(budgets => budgets.name === name)){
//                 return prevBudgets
//             }
//             return [...prevBudgets, { name , max}]  
//         })
//     }
//     function deleteBudget (){}
//     function deleteExpense (){}
//     return <BudgetsContext.Provider children value={{
//         budgets,
//         expense,
//         getBudgetExpense,
//         addExpense,
//         addBudget,
//         deleteBudget,
//         deleteExpense
//     }}>{children}  
//     </BudgetsContext.Provider>
// }
// for future use 