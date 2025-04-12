import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import PhuongAttributes from "../../../Assets/PhuongAttributes.json";
import styles from './Animation.module.css';
function Animation(props){
    const StringsToRender = ["COMPUTER ENGINEER", "WEB DEVELOPER", "BACKEND DEVELOPER", "OPEN SOURCE"];
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
        <div className="flex flex-col-reverse md:flex-row mt-20 mb-20">
            <div style={{flex: 1, overflow: "hidden"}} key={StringsToRender[stringIndex]} onAnimationEnd={updateStringIndex} className={styles.animation}>
                <div className={styles.text}>
                    {StringsToRender[stringIndex]}
                </div>
            </div>
            <SyntaxHighlighter language="json" style={vscDarkPlus} customStyle={{height: "fit-content", marginRight: "0px",  backgroundColor: "#1e1e1e", color: "#fff",}} codeTagProps={{style: { backgroundColor: "transparent" },}}>
                {JSON.stringify(PhuongAttributes, null, 2)}
            </SyntaxHighlighter>
        </div>
    )
}

export default Animation;
