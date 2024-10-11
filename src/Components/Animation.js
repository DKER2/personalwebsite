import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import PhuongAttributes from "../Assets/PhuongAttributes.json";
import styles from './Animation.module.css';
function Animation(props){
    const StringsToRender = ["COMPUTER ENGINEER", "WEB DEVELOPER", "BACKEND DEVELOPER", "OPENSOURCE"];
    const [stringIndex, setStringIndex] = useState(0);
    function updateStringIndex(){
        if(stringIndex!==StringsToRender.length-1){
            setStringIndex(stringIndex+1);
        }
        else{
            setStringIndex(0);
        }
    }
    return(
        <div style={{display:"flex", margin: "10px"}}>
            <div style={{flex: 1}} key={StringsToRender[stringIndex]} onAnimationEnd={updateStringIndex} className={styles.animation}>
                <div className={styles.text}>
                    {StringsToRender[stringIndex]}
                </div>
            </div>
            <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{height: "fit-content", margin: "50px", marginRight: "0px"}}>
                {JSON.stringify(PhuongAttributes, null, 2)}
            </SyntaxHighlighter>
        </div>
    )
}

export default Animation;
