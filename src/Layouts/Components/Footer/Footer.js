import React from "react";
import {CodeSlash, Meta, Linkedin} from 'react-bootstrap-icons';
import styles from './Footer.module.css';

function Footer(props){
    return(
        <div className={styles.footer}>
            <div style={{width:"80%", display:"flex", flexDirection:"row", margin:"auto", marginTop:"30px", fontSize:"18px"}}>
                <div style={{flex:"0.66", display:"flex", flexDirection:"column-reverse"}}>
                    <p>This Page was last updated at 11/10/2024 by DKER</p>
                </div>
                <div style={{flex:"0.33", padding:"10px", display:"flex", flexDirection:"column"}}>
                    <div>
                        <a style={{display:"flex", flexDirection:"row-reverse", textDecoration:"none", color:"white"}} href="https://www.facebook.com/profile.php?id=100009435389059"><Meta style={{fontSize:"32px", marginLeft:"15px", color:"white"}}/><div>Dang Huy Phuong</div></a>
                    </div>
                    <div style={{display:"flex", flexDirection:"row-reverse", marginTop:"7px"}}>
                        <a style={{display:"flex", flexDirection:"row-reverse", textDecoration:"none", color:"white"}} href="https://github.com/DKER2"><CodeSlash style={{fontSize:"32px", marginLeft:"15px"}}/><div>DKER2</div></a>
                    </div>
                    <div style={{display:"flex", flexDirection:"row-reverse", marginTop:"7px"}}>
                        <a style={{display:"flex", flexDirection:"row-reverse", textDecoration:"none", color:"white"}} href="https://www.linkedin.com/in/bryan-dang-3424bb220/"><Linkedin style={{fontSize:"32px", marginLeft:"15px"}}/><div>Dang Huy Phuong</div></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer