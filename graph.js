class Graph {
    constructor() {
        this.adjacencyList = {}
    }
    addVertex(vertex) {
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1 , vertex2) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }
    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((vertex) => vertex !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((vertex) => vertex !== vertex1);
    }
    removeVertex (vertex) {
        while(this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        if(this.adjacencyList[vertex]) {
            delete this.adjacencyList[vertex];
        }
    }
    depthFirstRecursive(start) {
        let result = [];
        let visited = {};
        function dfs(vertex) {
            if(!vertex) return null;
            result.push(vertex);
            visited[vertex] = true;
            this.adjacencyList[vertex].forEach(neighbor => {
                if(!visited[neighbor]) {
                    return dfs(neighbor)
                }
            });
        }
        dfs(start);
        return result;
    }
    depthFirstIterative(start) {
        let stack = [start];
        let result = [];
        let visited = {}; 
        let currentVertex;
        visited[start] = true;
        while(stack.length !== 0 ) {
            currentVertex = stack.pop();
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if(!visited[currentVertex]) {
                    visited[currentVertex] = true;
                        stack.push(neighbor)
                    }
            })
        }
        return result;
    }
    breadthFirst(start) {
        let queue = [];
        let result = [];
        let visited = {};
        let currentVertex;
        queue.push(start);
        visited[start] = true;
        while(queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if(!visited[currentVertex]) {
                    visited[currentVertex] = true;
                        queue.push(currentVertex);
                    }
            })
        }
        return result;
    }
}
let g = new Graph();