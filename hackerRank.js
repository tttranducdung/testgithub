function mergeLists(headA, headB) {
    if(!headA) return headB;
    if(!headB) return headA;
    let startBase = null;
    if(headA.data <= headB.data){
        startBase = headA;
        headA = headA.next;
    } else {
        startBase = headB;  
        headB = headB.next;
    }
    let start = startBase;
    while(headA && headB) {
        if(headA.data <= headB.data ) {
            start.next = headA;
            headA = headA.next;
        } else {
            start.next = headB;
            headB = headB.next;
        }
        start = start.next;
    }
    if(headA == null) {
        start.next = headB;
    } else {
        start.next = headA;
    }
    return startBase;
}
function removeDuplicates(head) {
    let currentNode = head;
    let temp = currentNode;
    let prev = head;
    while(temp.next) {
        temp = temp.next;
        if(temp.data === prev.data) {
            let tempNew = temp.next;
            prev.next = tempNew;
        } else {
            prev = temp;
        }
    }
    return currentNode;
}
class Node {
    constructor(val) {
        this.data = val; 
        this.next = null;
    }
}
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
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
        return this; 
    }
}
var list1 = new SinglyLinkedList();
list1.push(1);
list1.push(3);
list1.push(7);
list1.push(9);
var list2 = new SinglyLinkedList();
list2.push(2);
list2.push(4);
list2.push(6);
list2.push(8);

function rotateLeft(d, arr) {
    while(d > 0){
        let nodeHead = arr.shift();
        arr.push(nodeHead)
        d--;
    }
    return arr;
}

function plusArray(arr1, arr2){
    let result = []
    for(let i = 0 ; i <  arr1.length ; i ++) {
        result[i] = arr1[i] + arr2[i];
    }
    return result;
}
let queries = [
    [1,2,100],
    [2,5,100],
    [3,4,100]
]
// Prefix Sum
function arrayManipulation(n, queries) {
    let array = new Array(n);
    array.fill(0)
    var maxValue = 0;
    for(let i = 0 ; i < queries.length ; i++) {
        var a = queries[i][0];
        var b = queries[i][1];
        var k = queries[i][2];  
        array[a-1] += k;
        if ( b < n ) {
            array[b] += -k; 
        }
    }
    var runningTotal = 0;
    for ( var i = 0; i < n; i++ ) {
        runningTotal += array[i];
        if ( runningTotal > maxValue ) {
            maxValue = runningTotal;
        }
    }
    return maxValue;
}

let arrCount = [1,4,1,2,7,5,2]
function counterSort(arr) {
    let countArray = Array.from({length: 10}, () => 0);
    for( let i = 0 ; i < arr.length ; i++) {
        countArray[arr[i]]++;
    }
    for(let i = 1; i < countArray.length; i++) {
        countArray[i] = countArray[i] + countArray[i - 1]
    }
    let result = Array.from({length: arr.length }, () => 0);
    for(let i = 0; i < arr.length ; i++) {
        result[countArray[arr[i]] - 1] = arr[i];
        countArray[arr[i]]--;
    }
    return result;
}

function xuatGt(arr,k){
    let end = 0;
    let tong = 0;
    let start = 0;
    while(end < k){
        tong += arr[end]
        end++
    }
    let max = tong
    while(end < arr.length) {
        tong += arr[end++] - arr[start++]
        max = Math.max (max,tong);
    }
    return max;
}

function equalStacks(h1, h2, h3) {
    // Write your code here
    let count1 = h1.length - 2, count2 = h2.length - 2, count3 = h3.length - 2;
    while(count1 >= 0 || count2 >= 0 || count3 >= 0) {
        if(count1 >= 0) {
            h1[count1] = h1[count1] + h1[count1 + 1];
            count1--;
        }
        if(count2 >= 0) {
            h2[count2] = h2[count2] + h2[count2 + 1];
            count2--;
        }
        if(count3 >= 0) {
            h3[count3] = h3[count3] + h3[count3 + 1];
            count3--;
        }  
    }
    let index, check = false;
    console.log(h1)
    console.log(h2)
    console.log(h3)
    for(let i = 0; i < h1.length ; i++) {
        if(h2.indexOf(h1[i]) !== -1 && h3.indexOf(h1[i]) !== -1 ){
            index = i;
            check = true;
            break;
        }
    }
    if(check) return h1[index]
    return 0;
}

function twoStacks(x, a, b) {
    let removeA = [a[0]];
    let removeB = [b[0]];
    for(let i = 1; i < a.length ; i++) {
        a[i] = a[i] + a[i - 1];
        removeA.push(a[i]);
        if(a[i] > x){
            removeA.pop()
            break;
        }
    }
    for(let i = 1; i < b.length ; i++) {
        b[i] = b[i] + b[i - 1];
        removeB.push(b[i]);
        if(b[i] > x){
            removeB.pop()
            break;
        }
    }
    let max = 0, count = 0;
    for(let i = 0; i < removeA.length ; i++) {
        if(removeA[i] == x) {
            if((i + 1) > count) return i + 1;
        } else {
            for(let j = 0; j < removeB.length; j++) {   
                if((i + j +2) > count) {
                    if((max <= (removeA[i] + removeB[j])) && ((removeA[i] + removeB[j]) <= x) ) {
                        max = removeA[i] + removeB[j];
                        count = i + j + 2;
                    }
                }
            }
        }
    }
    return count;
}

function twoStacks2(max, stackA, stackB) {
    var gMax = 0;
    var count = 0, countA = 0, countB = 0;

    while(countA < stackA.length && gMax + stackA[countA] <= max) {
        gMax += stackA[countA];
        countA++;
    }
    count = countA;

    while(countB < stackB.length && countA >= 0) {
        gMax+=stackB[countB];
        countB++;

        while(gMax > max && countA > 0) {
            countA--;
            gMax-=stackA[countA];
        }

        if(gMax <= max && countA + countB > count) {
            count = countA + countB;
        }
    }
    return count;
}

function isBalanced(s) {
    let newStack = [s[0]];
    let countAdd = 1;
    let lastItem; 
    while(countAdd < s.length) {
        if(s[countAdd] == '{' || s[countAdd] == '[' || s[countAdd] == '('){
            newStack.push(s[countAdd])
        } else {
            lastItem = newStack.pop();
            if((s[countAdd] == '}' && lastItem !== '{') || (s[countAdd] ==']' && lastItem !== '[') || (s[countAdd] == ')' && lastItem !== '(')){
                return 'NO';
            } 
        }
        countAdd++;
    }
    if(newStack.length !== 0) return 'NO';
    return 'YES';
}

function largestRectangle0(hist) {
    var maxSize = -Infinity;
    var pStack = [];
    var hStack = [];
    var tempPos = 0;
    var tempH = 0;
    var tempSize = 0;
    var i;
    for(i = 0; i < hist.length; i++) {
        h = hist[i];
        if(hStack.length === 0 || h > hStack[hStack.length - 1]) {
            hStack.push(h);         
            pStack.push(i);

        } else if(h < hStack[hStack.length - 1]){
            while(hStack.length && h < hStack[hStack.length - 1]) {
                tempH = hStack.pop();
                tempPos = pStack.pop();
                tempSize = tempH * (i - tempPos);
                maxSize = Math.max(tempSize, maxSize);
            }
            hStack.push(h);
            pStack.push(tempPos);
        }
    }
    console.log(pStack)
    while(hStack.length){
        tempH = hStack.pop();
        tempPos = pStack.pop();
        tempSize = tempH * (i - tempPos);
        maxSize = Math.max(tempSize, maxSize);
    }
    return maxSize;
}

function poisonousPlants(p) {
    let stack = [];
    let maxDay = 0;
    let day;
    for(let plant = 0; plant < p.length ; plant++) {
        day = 0;
        while(stack.length !== 0 && stack[stack.length - 1][0] >= p[plant]){
            day = stack.pop()[1];
        }
        if(stack.length !== 0){
            day += 1
        } else {
            day = 0
        }
        maxDay = Math.max(maxDay,day);
        stack.push([p[plant],day]);
        console.log(stack)
    }
    console.log(stack)
    return maxDay;
}
let p =[6,5,8,4,7,12,5,9] 
console.log(poisonousPlants(p))