import React from "react";
import styles from './Header.module.css';
function Header(props){
    function NavigateItem(props){
        return(
            <button className={styles.button} onClick={() => {props.scrollTo(props.name)}}> 
                <div>{props.name}</div>
            </button>
        )
    }
    return(
        <div>
            <div style={{backgroundColor:"white", margin:"auto", width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-around", borderBottom:"solid 3px #555", position:"fixed", zIndex:"99"}}>
                <NavigateItem name="Experience" scrollTo={props.scrollTo}/>
                <div className={styles.seperateLine}></div>
                <NavigateItem name="Project" scrollTo={props.scrollTo}/>
                <div className={styles.seperateLine}></div>
                <NavigateItem name="Academic Learning" scrollTo={props.scrollTo}/>
                <div className={styles.seperateLine}></div>
                <NavigateItem name="Contact" scrollTo={props.scrollTo}/>
            </div>
        </div>
    )
}
export default Header;