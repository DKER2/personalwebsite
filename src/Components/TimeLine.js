import React from 'react';
import {Dot, ArrowRight} from 'react-bootstrap-icons';
import styles from './TimeLine.module.css';

function TimeLine(props){
    var timeLine = props.timeLine;

    function OneTimeLine(props){
        timeLine = props.timeLine;
        return(
            <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{flex:"0.15", paddingTop: "19px", fontSize:"16px", fontWeight:"500"}}>
                    {timeLine[0] + "-" + timeLine[1]} 
                </div>
                <div style={{flex:"0.075", borderLeft:"solid 5px #333"}}>
                    <Dot style={{fontSize:"60px", left:"-33px", position:"relative"}}/>
                </div>
                <div style={{flex:"0.775", paddingTop: "19px", position:"relative", top:"-9px"}}>
                    <div style={{fontSize:"30px", fontWeight:"500"}}>
                        {timeLine[2]}
                    </div>
                    <div>
                        {timeLine[3].map((timeLine, index) => {
                            return(
                                <div key={index} style={{display:"flex", flexDirection:"row", padding:"15px"}}>
                                    <div style={{marginRight:"20px"}}>
                                        <ArrowRight/>
                                    </div>
                                    <div>
                                        {timeLine}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div style={{opacity:props.opacity}}>
            {timeLine.map((timeLine, index) =>{
                return(<OneTimeLine key={index} timeLine={timeLine}/>)
            })}
        </div>
    )
}

export default TimeLine;