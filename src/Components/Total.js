function Total( {sums, max} ){
    
    
    return(
        
        <div className='total'>
           <div className="titles">
                <h2>Total</h2>
                <h3>${sums} / <span className="max">${max}</span></h3>
            </div>
        </div>
    )
}

export default Total;