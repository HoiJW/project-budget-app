import { useEffect, useState } from "react";
function Total( {sums, max} ){
    
    //color change useState
    const [bgc, setBgc] = useState("total green")
    useEffect(() => {
        if (sums > max){setBgc("total red")}
        else if(sums <= max*0.4){setBgc("total green")}
        else if(sums <= max*0.75){setBgc("total yellow")}
    },[sums,max])
    return(
        
        <div className={bgc}>
           <div className="titles">
                <h2>Total Expenses</h2>
                <p className="smile">😊</p>
                <p className="meh">🤨</p>
                <p className="sad">😥</p>

                <h3>${sums} / <span className="max">${max}</span></h3>
            </div>
        </div>
    )
}

export default Total;