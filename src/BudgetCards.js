function BudgetCards( { name , amount , max}){
    return(
        <div className='budget-cards'>
            <div className="titles">
            <h2>{name}</h2>
            <h3>${amount} / ${max}</h3>
            </div>
        </div>
    )
}

export default BudgetCards;