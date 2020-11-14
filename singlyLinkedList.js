class Node {
    constructor(val) {
        this.val = val; 
        this.next = null;
    }
}
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        let newNode = new Node(val);
        if(!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this; 
    }
    pop() {
        if(!this.head || this.length == 0) return undefined; 
        var current = this.head;
        var newTail = current;
        while(current.next){
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if(this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }
    shift() {
        if(!this.head || this.length == 0) return undefined; 
        var currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if(this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return currentHead;
    }
    unshift(val) {
        var newNode = new Node(val);
        if(!this.head) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }
    //retrieving a node by it's position in the Linked List;
    get(index) {
        if(index < 0 || index >= this.length) return null;
        let counter = 0;
        var current = this.head;
        while(counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }
    set(index,val) {
        var nodeFound = this.get(index);
        if(!nodeFound) return false;
        nodeFound.val = val;
        return true;
    }
    insert(index,val) {
        if(index < 0 || index > this.length) return false;
        if(index === this.length) return !!this.push(val);
        if(index == 0) return !!this.unshift(val);
        var newNode = new Node(val);
        var prevNode = this.get(index - 1);
        var temp = prevNode.next;
        prevNode.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }
    remove(index) {
        if(index < 0 || index >= this.length) return undefined;
        if(index === this.length - 1) return this.pop();
        if(index === 0 ) return this.shift();
        var prevNode = this.get(index - 1);
        var removed = prevNode.next;
        prevNode.next = removed.next;
        this.length--;
        return removed;
    }
    reverse() {
        var node = this.head;
        this.head = this.tail;
        this.tail = node;
        var next;
        var prev = null;
        for(var i = 0; i < this.length ; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;    
    }
}
var list = new SinglyLinkedList();
list.push('HELLO');
list.push('GoodBye');
list.push('GoodBye1');
list.push('!');