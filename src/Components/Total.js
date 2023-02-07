import { useEffect, useState } from "react";
import { motion } from "framer-motion";
function Total( {sums, max} ){
    const [bgc, setBgc] = useState("total green")
    useEffect(() => {
        if (sums >= max){setBgc("total red")}
        else if(sums <= max*0.55){setBgc("total green")}
        else if(sums <= max*0.75){setBgc("total yellow")}
    },[sums,max])
    return(
        <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5}}
        className={bgc}>
           <div className="titles">
                <h2>Total Expenses</h2>
                <p className="smile">😊 yay~!</p>
                <p className="meh">🤨 hmm~Already?</p>
                <p className="sad">😥 OH NO!</p>
                <h3>${sums} / <span className="max">${max}</span></h3>
            </div>
        </motion.div>
    )
}

export default Total;