import React from 'react';
import styles from './ProfilePicture.module.css';
import {Github, Linkedin} from 'react-bootstrap-icons';
function ProfilePicture(){
    return(
        <div className={styles.center}>
            <div className={styles.ProfilePictureOuter}>
                <img className={styles.ProfilePicture} alt="My ERROR FACE" src={process.env.PUBLIC_URL + `/ProfilePicture.png`}/> 
            </div>
            <div className="flex flex-row" style={{marginTop:"50px"}}>
                <a href="https://github.com/DKER2" target="_blank" rel="noopener noreferrer"><Github style={{fontSize:"32px", color:"black"}}/></a>
                <a href="https://www.linkedin.com/in/dang-huy-phuong-3424bb220/" target="_blank" style={{marginLeft:"20px"}} rel="noopener noreferrer"><Linkedin style={{fontSize:"32px", color:"black"}}/></a>
            </div>
        </div>
    )
}

export default ProfilePicture;
