import React from "react";
import "./Node.css";
import { useEffect,useState } from "react";
import Astar from  "./astar.js";
const Node=({isEnd,row,col,isWalls,isStart,Grid,setGrid, NODE_END_COL, NODE_END_ROW, NODE_START_COL, NODE_START_ROW, setvisitedNodes, setPath})=>{
    const [classes,setClasses]= useState("");
    useEffect(()=>{
        setClasses(isStart ? "node-start" : isWalls ? "iswall" : isEnd ? "node-end" : "");
    },[isStart,classes,isWalls])
    return(
        <div
        onClick={(e)=>{
            let newIds = Grid.slice();
            newIds[row][col].isWalls=!newIds[row][col].isWalls;
            console.log(e.target.value)
            const startNode=Grid[NODE_START_ROW][NODE_START_COL];
            const endNode=Grid[ NODE_END_ROW][ NODE_END_COL];
            let path=Astar(startNode,endNode);
            startNode.isWalls=false;
            endNode.isWalls=false;
            setPath(path.path);
            setvisitedNodes(path.visitedNodes);
            setGrid(newIds)
        }} className={`node ${classes}`} id={`node-${row}-${col}`}></div>
    )
}
export default Node;