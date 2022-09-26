import React, { useEffect, useRef, useState } from "react";
import styles from './Animation.module.css';
function Animation(props){
    const StringsToRender = ["COMPUTER ENGINEER DEGREE", "WEB DEVELOPER", "NATURAL LANGUAGE PROCESSING"];
    const [stringIndex, setStringIndex] = useState(0);
    function updateStringIndex(){
        if(stringIndex!=StringsToRender.length-1){
            setStringIndex(stringIndex+1);
        }
        else{
            setStringIndex(0);
        }
    }
    return(
        <div key={StringsToRender[stringIndex]} onAnimationEnd={updateStringIndex} className={styles.animation}>
            <div className={styles.text}>
                {StringsToRender[stringIndex]}
            </div>
        </div>
    )
}

export default Animation;