class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    push(val) {
        let newNode = new Node(val);
        if(!this.first == 0) {
            this.first = newNode;
            this.last = newnode;
        } else {
            let temp = this.first;
            this.first = newNode;
            newNode.next = temp;
        }
        return ++this.size;
    }
    pop() {
        if(this.size === 0) return null;
        let firstNode = this.first;
        if(this.first == this.last) {
            this.last = null
        }
        this.first = firstNode.next;
        firstNode.next = null;
        this.size--;
        return firstNode.val;
    }
}