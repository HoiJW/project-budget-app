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
        initial={{ scale: 0.1 }}
        animate={{ rotate: [90,-45,40,0] ,scale: 1 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,duration: 0.5
        }}
        drag
            dragConstraints={{
            top: -30,
            left: -30,
            right: 30,
            bottom: 30,
            }}
        whileHover={{ rotate: [0, -30, 30, 0] }}
        
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