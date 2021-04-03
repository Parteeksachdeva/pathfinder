import React from "react";
import "./Node.css";
import { useEffect,useState } from "react";

//setStartRow,setStartCol,isStart,isEnd,
const Node=({isEnd,row,col,isWalls})=>{
    const [classes,setClasses]= useState("");
    const [isStart,setIsStart] = useState(false);
    useEffect(()=>{
        setClasses(isStart?"node-start" : isWalls ? "iswall" : isEnd ? "node-end" : "");
    },[isStart,classes])
    return(
        <div onClick={()=>{
                setIsStart(true);
                // console.log(row, col);
        }} className={`node ${classes}`} id={`node-${row}-${col}`}></div>
    )
}
export default Node;