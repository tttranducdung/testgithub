class PriorityQueue {
    constructor() {aaaaaaaaaaaaaaaaaaaaaaaaaaaa
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a,b) => a.priority - b.priority);
    }
}
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node:vertex2, weight})
        this.adjacencyList[vertex2].push({node:vertex1, weight})
    }
    addEdgeHR(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node:vertex2, weight})
    }
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;
        //build up initial state
        for(let vertex in this.adjacencyList) {
            if(vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while(nodes.values.length) {
            smallest = nodes.dequeue().val;
            if(smallest === finish) {
                // WE ARE DONE 
                // BUILD UP PATH TO RETURN AT END
                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if(smallest || distances[smallest] !== Infinity) {
                for(let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor]
                    //colculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if(candidate < distances[nextNeighbor]) {
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - how we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate)
                    }
                }
            }

        }
        return path.concat(smallest).reverse();
    }
}
var graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);
// console.log(graph.Dijkstra("A","E"))
function a(){
    let count = 1;
    while(count < 10){
        count++
        if(count > 5) {continue;}
        console.log(count)
    }
}
a()
//#region TEST PATH
function minimumMoves(gridA, startX, startY, goalX, goalY) {
    let graph = new WeightedGraph();
    let grid = [];
    for(let i = 0; i < gridA.length ; i++) {
        grid.push([]);
        for(let j = 0; j < gridA[i][0].length; j++) {
                grid[i].push(gridA[i][0][j])
        }
    }
    for(let i = 0; i < grid.length ; i++) {
        for(let j = 0; j < grid.length; j ++) {
            if(grid[i][j] !== 'X') {
                grid[i][j] = [i,j];
                graph.addVertex(grid[i][j]);
            } 
        }
    }
    for(let i = 0; i < grid.length ; i++) {
        for(let j = 0; j < grid.length; j ++) {
            if(grid[i][j] !== 'X') {
                if(( i <= (grid.length - 2) ) && grid[i + 1][j] !== "X") {
                    graph.addEdgeHR(grid[i][j],grid[i + 1][j] , 1)
                }
                if(i >= 1 && grid[i - 1][j] !== "X") {
                    graph.addEdgeHR(grid[i][j],grid[i - 1][j] , 1)
                }
                if(j >= 1 && grid[i][j - 1] !== "X") {
                    graph.addEdgeHR(grid[i][j],grid[i][j - 1] , 1)
                }
                if((j <= (grid.length - 2)) && grid[i][j + 1] !== "X") {
                    grid[i][j + 1] = [i,j + 1]
                    graph.addEdgeHR(grid[i][j],grid[i][j + 1] , 1)
                }
            } 
        }
    }
    let cons = graph.adjacencyList;
    for(let v in cons){
        console.log(v)
        console.log(cons[v])
    }
    let shortestPath = graph.Dijkstra([startX,startY].toString(),[goalX,goalY].toString());
    let mang1 = [];
    let mang2 = [];
    for(let i = 0 ; i < shortestPath.length; i++){
        if(typeof shortestPath[i] !== 'object'){
            shortestPath[i] = shortestPath[i].split(',').map(v => parseInt(v))
        } 
        mang1.push(shortestPath[i][0]);
        mang2.push(shortestPath[i][1]);
    }
    let start;
    let end;
    let hieu;
    for( let i = 0;  i < mang1.length ; i++) {
        start = i;
        end = i + 1;
        while(mang1[start] == mang1[end]) {
            end++;
        }
        hieu = end - start;
        if(hieu >= 3) {
            mang1.splice(start + 1,hieu - 2)
            mang2.splice(start + 1,hieu - 2)
            shortestPath.splice(start + 1,hieu - 2)
        }
    }
    for( let i = 0;  i < mang2.length ; i++) {
        start = i;
        end = i + 1;
        while(mang2[start] == mang2[end]) {
            end++;
        }
        hieu = end - start;
        if(hieu >= 3) {
            mang2.splice(start + 1,hieu - 2)
            mang1.splice(start + 1,hieu - 2)
            shortestPath.splice(start + 1,hieu - 2)
        }
    }

    return shortestPath
}
let grid = [
    ['...X......XX.X...........XX....X.XX.....'],
    ['.X..............X...XX..X...X........X.X'],
    ['......X....X....X.........X...........X.'],
    ['.X.X.X..X........X.....X.X...X.....X..X.'],
    ['....X.X.X...X..........X..........X.....'],
    ['..X......X....X....X...X....X.X.X....XX.'],
    ['...X....X.......X..XXX.......X.X.....X..'],
    ['...X.X.........X.X....X...X.........X...'],
    ['XXXX..X......X.XX......X.X......XX.X..XX'],
    ['.X........X....X.X......X..X....XX....X.'],
    ['...X.X..X.X.....X...X....X..X....X......'],
    ['....XX.X.....X.XX.X...X.X.....X.X.......'],
    ['.X.X.X..............X.....XX..X.........'],
    ['..X...............X......X........XX...X'],
    ['.X......X...X.XXXX.....XX...........X..X'],
    ['...X....XX....X...XX.X..X..X..X.....X..X'],
    ['...X...X.X.....X.....X.....XXXX.........'],
    ['X.....XX..X.............X.XX.X.XXX......'],
    ['.....X.X..X..........X.X..X...X.X......X'],
    ['...X.....X..X.............X......X..X..X'],
    ['........X.....................X....X.X..'],
    ['..........X.....XXX...XX.X..............'],
    ['........X..X..........X.XXXX..X.........'],
    ['..X..X...X.......XX...X.....X...XXX..X..'],
    ['.X.......X..............X....X...X....X.'],
    ['.................X.....X......X.....X...'],
    ['.......X.X.XX..X.XXX.X.....X..........X.'],
    ['X..X......X..............X..X.X.......X.'],
    ['X........X.....X.....X....XX.......XX...'],
    ['X.....X.................X.....X..X...XXX'],
    ['XXX..X..X.X.XX..X....X.....XXX..X......X'],
    ['..........X.....X.....XX................'],
    ['..X.........X..X.........X...X.....X....'],
    ['.X.X....X...XX....X...............X.....'],
    ['.X....X....XX.XX........X..X............'],
    ['X...X.X................XX......X..X.....'],
    ['..X.X.......X.X..X.....XX.........X..X..'],
    ['........................X..X.XX..X......'],
    ['........X..X.X.....X.....X......X.......'],
    ['.X..X....X.X......XX....................']]
let grid2 = [
    ['.X..XX...X'],
    ['X.........'],
    ['.X.......X'],
    ['..........'],
    ['........X.'],
    ['.X...XXX..'],
    ['.....X..XX'],
    ['.....X.X..'],
    ['..........'],
    ['.....X..XX'],
]
let grid3 = [
    ['.X.X'],
    ['...X'],
    ['.X..'],
    ['...X']
]
//#endregion
