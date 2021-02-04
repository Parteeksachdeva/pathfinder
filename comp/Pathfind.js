import React,{useState,useEffect} from  "react";
import  "./Pathfind.css";
import Node from "./Node.js";
//import DFS from "./Dfs.js";
import Astar from  "./astar.js";
import { Button, Switch } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
  }));
const Pathfinder = ()=>{
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
        //const path=DFS(grid,rows,cols,startNode,endNode);
        //setPath(path);
        let path=Astar(startNode,endNode);
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
                            const {isStart,isEnd,isWalls}=col;
                            return <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWalls={isWalls}/>;
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
    const classes = useStyles();
  const [Algorithm, setAlgorithm] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAlgorithm(event.target.value);
    if(Algorithm===1) console.log("A*");
    if(Algorithm===2) console.log("Dishtraa's");
    if(Algorithm===3) console.log("DFS");
    if(Algorithm===4) console.log("BFS");

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
    //console.log(Path);
    return (
        <div classname="Wrapper">
            <h1>PathFinder</h1>
        <div className="button-select">
            
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Algorithm</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={Algorithm}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>A*</MenuItem>
          <MenuItem value={2}>Dishktra's</MenuItem>
          <MenuItem value={3}>DFS</MenuItem>
          <MenuItem value={4}>BFS</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant="contained" color="primary"  onClick={visualizePath}>Visualize</Button>
      
      </div>
            <div className="grid">{gridwithNode}</div>
        </div>
    );
};

export default Pathfinder; 