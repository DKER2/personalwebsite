import React from 'react';
import {Dot, ArrowRight} from 'react-bootstrap-icons';

function TimeLine(props){
    var isDisplayLogo = props.isDisplayLogo
    var timeLine = props.timeLine;

    function OneTimeLine(props){
        var [startDate, endDate, title, details, imagePath] = props.timeLineItem;
        return (
          <div className="flex flex-col lg:flex-row">
            <div
              style={{
                flex: "0.2",
                paddingTop: "19px",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {startDate + "-" + endDate}
            </div>
            <div className="hidden lg:block" style={{ flex: "0.075", borderLeft: "solid 5px #333" }}>
              <Dot
                style={{
                  fontSize: "60px",
                  left: "-33px",
                  position: "relative",
                }}
              />
            </div>
            <div
              style={{
                flex: "0.775",
                paddingTop: "19px",
                position: "relative",
                top: "-9px",
              }}
            >
              <div className="flex content-center items-center" style={{ fontSize: "30px", fontWeight: "500" }}>
                {title}
                {isDisplayLogo &&
                <div className='m-3'>
                  <img
                    src={process.env.PUBLIC_URL + `/${imagePath}`}
                    alt="CompanyLogo"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>}
              </div>
              <div>
                {details.map((timeLineItem, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: "15px",
                      }}
                    >
                      <div style={{ marginRight: "20px" }}>
                        <ArrowRight />
                      </div>
                      <div>{timeLineItem}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
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