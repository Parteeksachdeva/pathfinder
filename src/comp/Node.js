import React from "react";
import "./Node.css";
const Node=({isStart,isEnd,row,col,isWalls})=>{
    const classes=isStart?"node-start" : isWalls ? "iswall" : isEnd ? "node-end" : "";
    return(
        <div className={`node ${classes}`} id={`node-${row}-${col}`}></div>
    )
}
export default Node;