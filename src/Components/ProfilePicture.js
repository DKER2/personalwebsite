import React from 'react';
import styles from './ProfilePicture.module.css';
import ProfilePicturePath from '../Assets/Pictures/ProfilePicture.png';
import {Github, Linkedin} from 'react-bootstrap-icons';
function ProfilePicture(){
    return(
        <div className={styles.center}>
            <div className={styles.ProfilePictureOuter}>
                <img className={styles.ProfilePicture} alt="My ERROR FACE" src={ProfilePicturePath}/> 
            </div>
            <div style={{marginTop:"50px"}}>
                <a href="https://github.com/DKER2" target="_blank"><Github style={{fontSize:"32px", color:"black"}}/></a>
                <a href="https://www.linkedin.com/in/dang-huy-phuong-3424bb220/" target="_blank" style={{marginLeft:"20px"}}><Linkedin style={{fontSize:"32px", color:"black"}}/></a>
            </div>
        </div>
    )
}

export default ProfilePicture;
