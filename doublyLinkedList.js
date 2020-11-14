class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        var newNode = new Node(val);
        if(this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }
    pop() {
        var currertTail = this.tail;
        if(this.length === 0) return undefined;
        if(this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = currertTail.prev;
            this.tail.next = null; 
            currertTail.prev = null;          
        }
        this.length--;
        return currertTail;
    }
    shift() {
        var currentHead = this.head;
        if(this.length === 0) return undefined;
        if(this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = currentHead.next;
            this.head.prev = null;
            currentHead.next = null;
        }
        this.length--;
        return currentHead;
    }
    unshift(val) {
        var newNode = new Node(val);
        if(this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;

    }
    get(index) {
        if(index < 0 || index >= this.length) return null;
        if(index <= this.length / 2) {
            let current = this.head;
            let counter = 0;
            while(counter !== index){
                current = current.next;
                counter++;
            }
            return current;
        } else {
            let current = this.tail;
            let counter = this.length - 1;
            while(counter !== index){
                current = current.prev;
                counter--;
            }
            return current;
        }
    }
    set(index,val) {
        var nodeGet = this.get(index);
        if(!nodeGet) return false;
        nodeGet.val = val;
        return true;
    }
    insert(index,val) {
        if(index < 0 || index > this.length) return false;
        if(index === 0) return !!this.unshift(val);
        if(index === this.length) return !!this.push(val);

        var newNode = new Node(val);
        var prevNode = this.get(index - 1);
        var nextNode = this.get(index); // prevNode.next

        prevNode.next = newNode, newNode.prev = prevNode;
        newNode.next = nextNode, nextNode.prev = newNode;
        this.length++;
        return true;
    }
    remove(index,val) {
        if(index < 0 || index >= this.length) return undefined;
        if(index === 0) return this.shift();
        if(index === this.length - 1) return this.pop();

        var removeNode = this.get(index);
        var prevNode = removeNode.prev;
        var nextNode = removeNode.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        removeNode.next = null;
        removeNode.prev = null;
        this.length--;
        return removeNode;
    }
}
var list = new DoublyLinkedList();
list.push(1)
list.push(3)
list.push(4)
list.push(5)
list.push(6)
