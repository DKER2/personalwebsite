import React from "react";
import {CodeSlash, Meta, Linkedin} from 'react-bootstrap-icons';

function Footer(props){
    return(
        <div className="h-[200px] text-white bg-[#777]">
            <div className="w-4/5 flex flex-row mx-auto mt-[30px] text-[18px]">
                <div className="flex-[0.66] flex flex-col-reverse">
                    <p>This Page was last updated at 11/10/2024 by DKER</p>
                </div>
                <div className="flex-[0.33] p-[10px] flex flex-col">
                    <a className="flex flex-row-reverse no-underline text-white" href="https://www.facebook.com/profile.php?id=100009435389059">
                        <Meta className="text-[32px] ml-[15px] text-white"/>
                        <div>Dang Huy Phuong</div>
                    </a>
                    <a className="flex flex-row-reverse no-underline text-white mt-[7px]" href="https://github.com/DKER2">
                        <CodeSlash className="text-[32px] ml-[15px] text-white"/>
                        <div>DKER2</div>
                    </a>
                    <a className="flex flex-row-reverse no-underline text-white mt-[7px]" href="https://www.linkedin.com/in/dang-huy-phuong-3424bb220/">
                        <Linkedin className="text-[32px] ml-[15px] text-white"/>
                        <div>Dang Huy Phuong</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer