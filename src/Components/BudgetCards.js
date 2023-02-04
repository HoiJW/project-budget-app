// import { useEffect, useState } from "react";
function BudgetCards( { name , amount , max}){
    
    
    return(
        
        <div className='budget-cards'>
            <div className="titles">
                <h2>{name}</h2>
                <h3>${amount} / <span className="max">${max}</span> </h3>
            </div>
            
            <div className="progress-bar">
            </div>
        </div>
    )
}

export default BudgetCards;