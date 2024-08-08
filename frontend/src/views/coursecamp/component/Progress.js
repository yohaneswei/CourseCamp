import React from "react";
import "../style.css";
import CountUp from "react-countup";

export default function Progress({ percent = '0%', backgroundColor = "#FFFFFE", height = "20", ShowPercent = true, boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.15)", color = "#2EB85C" }) {
    return (
        <div className="outer-container" style={{ backgroundColor: backgroundColor, height: `${height}px`, boxShadow: boxShadow }}>
            <div className="inner-container">
                <div className="progress-bar" style={{ width: `${percent}%`, backgroundColor: color }}></div>
                {ShowPercent &&
                    <div className="percent">
                        <CountUp
                            start={0}
                            prefix={""}
                            suffix={"%"}
                            separator={""}
                            end={percent}
                            duration={3}
                        />
                    </div>
                }
            </div>
        </div>
    )
}