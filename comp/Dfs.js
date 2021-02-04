function DFS(grid,rows,cols,startNode,endNode){
        for(let i=0;i<rows;++i){
            for(let j=0;j<cols;++j){
               if(grid[0][0]===endNode){
                        return true;
               }
            }
        }
}
export default DFS;