function Total( {sums, max} ){
    
    //color change useState
    // const [bgc, setBgc] = useState("green")
    return(
        
        <div className='total'>
           <div className="titles">
                <h2>Total Expenses</h2>
                <h3>${sums} / <span className="max">${max}</span></h3>
            </div>
        </div>
    )
}

export default Total;