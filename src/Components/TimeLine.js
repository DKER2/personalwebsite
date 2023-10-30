import React from 'react';
import {Dot, ArrowRight} from 'react-bootstrap-icons';

function TimeLine(props){
    var timeLine = props.timeLine;

    function OneTimeLine(props){
        var timeLineItem = props.timeLineItem;
        return(
            <div style={{display:"flex", flexDirection:"row"}}>
                <div style={{flex:"0.2", paddingTop: "19px", fontSize:"16px", fontWeight:"500"}}>
                    {timeLineItem[0] + "-" + timeLineItem[1]} 
                </div>
                <div style={{flex:"0.075", borderLeft:"solid 5px #333"}}>
                    <Dot style={{fontSize:"60px", left:"-33px", position:"relative"}}/>
                </div>
                <div style={{flex:"0.775", paddingTop: "19px", position:"relative", top:"-9px"}}>
                    <div style={{fontSize:"30px", fontWeight:"500"}}>
                        {timeLineItem[2]}
                    </div>
                    <div>
                        {timeLineItem[3].map((timeLineItem, index) => {
                            return(
                                <div key={index} style={{display:"flex", flexDirection:"row", padding:"15px"}}>
                                    <div style={{marginRight:"20px"}}>
                                        <ArrowRight/>
                                    </div>
                                    <div>
                                        {timeLineItem}
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
            {timeLine.map((timeLineItem, index) =>{
                return(<OneTimeLine key={index} timeLineItem={timeLineItem}/>)
            })}
        </div>
    )
}

export default TimeLine;