import React,{useState,useEffect} from  "react";
import  "./Pathfind.css";
import Node from "./Node.js";
import Astar from  "./astar.js";
import { Button } from '@material-ui/core';
const Pathfinder = ()=>{
    const [startRow,setStartRow]=useState(0);
    const [startCol,setStartCol]=useState(0);
    const rows=10;
    const cols=25;
    const NODE_START_ROW=0;
    const NODE_START_COL=0;
    const NODE_END_COL=cols-1;
    const NODE_END_ROW=rows-1;
    const [Grid,setGrid]=useState([]);
    const [Path,setPath]= useState([]);
    const [visitedNodes,setvisitedNodes] = useState([]);
    
    useEffect(()=>{
        initalizeGrid();
    },[]);
    
    
    //intialize the grid
    const initalizeGrid=()=>{
        const grid= new Array(cols);
        for(let i=0;i<rows;++i){
            grid[i]=new Array(cols);
        }
        createSpot(grid);

        setGrid(grid);
        addNeighbours(grid);
        const startNode=grid[NODE_START_ROW][NODE_START_COL];
        const endNode=grid[ NODE_END_ROW][ NODE_END_COL];
        let path=Astar(startNode,endNode);
        //console.log(Astar(startNode,endNode));
        startNode.isWalls=false;
        endNode.isWalls=false;
        setPath(path.path);
        setvisitedNodes(path.visitedNodes);
    };

    //craete the spot
    const createSpot=(grid)=>{
        for(let i=0;i<rows;++i){
            for(let j=0;j<cols;++j){
                grid[i][j] = new Spot(i,j);
                
            }
        }
    }
    //Add neigbours
    const addNeighbours =(grid)=>{
        for(let i=0;i<rows;++i){
            for(let j=0;j<cols;++j){
                grid[i][j].addneighbours(grid);
            }
        }
    }
    //Spot constructer
    function Spot(i,j){
        this.x=i;
        this.y=j;
        this.isStart= this.x===NODE_START_ROW && this.y===NODE_START_COL;
        this.isEnd= this.x===NODE_END_ROW && this.y===NODE_END_COL;
        this.g=0;
        this.f=0;
        this.h=0;
        this.neighbours=[];
        this.isWalls=false;
        if(Math.random(1)<0.2){
            this.isWalls=true;
        }
        this.previous=undefined;
        this.addneighbours = function(grid){
            let i=this.x;
            let j=this.y;
            if(i>0) this.neighbours.push(grid[i-1][j]);
            if(i<rows-1) this.neighbours.push(grid[i+1][j]);
            if(j>0) this.neighbours.push(grid[i][j-1]);
            if(j<cols-1) this.neighbours.push(grid[i][j+1]);
        }
    }

    //GRID WITH NODE
     const gridwithNode=(
         <div>
             {Grid.map((row,rowIndex)=>{
                 return(
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col,colIndex)=>{
                            // console.log(col);
                            const {isStart,isEnd,isWalls}=col;
                            return <Node NODE_END_COL={NODE_END_COL} NODE_END_ROW={NODE_END_ROW} NODE_START_COL={NODE_START_COL} NODE_START_ROW={NODE_START_ROW} setvisitedNodes={setvisitedNodes} setPath={setPath} Grid={Grid} setGrid={setGrid} setStartRow={setStartRow} setStartCol={setStartCol} key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWalls={isWalls}/>;
                        })}
                    </div>
                 );
             }

             )}
         </div>
    );
    const visualizeShortestPath=(shortestPathNodes)=>{
        for(let i=0;i<shortestPathNodes.length;++i){
            setTimeout(()=>{
                const node= shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className=
                "node node-shortest-path";
            },10*i);
        }
    };
    const visualizePath= ()=>{
        for(let i=0;i<=visitedNodes.length;++i){
            if(i===visitedNodes.length){
                setTimeout(()=>{
                    visualizeShortestPath(Path);
                },20*i);
            }
            else{
                setTimeout(()=>{
                    const node= visitedNodes[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className=
                    "node node-visited";
                }
        ,20*i)}
        }
    };
    //console.log(Path);
    // function ClearGrid(){
    //     setClear(true);
    // }
    return (
        <div className="Wrapper">
            <div className="Wrapper__header">
                <h1>PathFinder</h1>
                <div className="buttons">
               <Button  variant="contained" color="primary" onClick={visualizePath}>Visualize</Button>
                <p>(A* Algorithm)</p>
                <Button  variant="contained" color="primary" onClick={()=>{
                    let newIds = Grid.slice();
                    for(let i=0;i<rows;i++){
                        for(let j=0;j<cols;j++){
                            newIds[i][j].isWalls=false;
                            if(Math.random(1)<0.2){
                                newIds[i][j].isWalls=true;
                            } 
                            const startNode=Grid[NODE_START_ROW][NODE_START_COL];
                            const endNode=Grid[ NODE_END_ROW][ NODE_END_COL];
                            let path=Astar(startNode,endNode);
                            startNode.isWalls=false;
                            endNode.isWalls=false;
                            setPath(path.path);
                            setvisitedNodes(path.visitedNodes);
                            if(i===NODE_START_ROW && j===NODE_START_ROW) document.getElementById(`node-${i}-${j}`).className="node node-start";
                            else if(i=== NODE_END_ROW && j=== NODE_END_COL) document.getElementById(`node-${i}-${j}`).className="node node-end";
                            else document.getElementById(`node-${i}-${j}`).className="node";
                        }
                    }
                    
                    setGrid(newIds)
                    
                    }}>Reset</Button>
                </div>
            </div>
            <div className="grid">{gridwithNode}</div>
        </div>
    );
};

export default Pathfinder; 