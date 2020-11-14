// A LIFO data structure, LAST IN FISRT OUT >< Queues FIRST IN FIRST OUT
//the last element added to the stack will be the first element removed from the stack
//A stack again is just a collection of data
//in fact a stack is just a concept
//using array.push / pop , array.shift/unshift;
//using a linked list
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    push(val) {
        var newNode = new Node(val);
        if(!this.first) {
            this.first = newNode;
            this.last = newNode;
        } else {
            var temp = this.first;
            this.first = newNode;
            this.first.next = temp;
        }
        return ++this.size;
    }
    pop() {
        if(!this.first) return null;
        var temp = this.first;
        if(this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

}

