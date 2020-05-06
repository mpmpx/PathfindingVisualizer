/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Stack() {
    this.arr = [];
    this.push = (element) => {
        this.arr.push(element);
    };

    this.pop = () => this.arr.pop();
   
    this.isEmpty = () => this.arr.length === 0;
}

function Queue() {
    this.arr = [];
    this.index = 0;
    this.push = (element) => {
        this.arr.push(element);
    };
    
    this.pop = () => {
       if (this.isEmpty()) {
           return undefined;
       }
       
       var element = this.arr[this.index];
       this.index++;
       if (this.index === this.arr.length/2) {
           this.arr.splice(0, this.index);
           this.index = 0;
       } 
       else if (this.index === this.arr.length) {
           this.arr.splice(0, this.arr.length);
           this.index = 0;
       }
       
       return element;
    };
    
    this.isEmpty = () => this.index >= this.arr.length;
}

// a min priority queue by default comparator function
function PriorityQueue() {
    this.arr = [];
    
    this.push = (element) => {
        var ptr = this.arr.length;
        this.arr.push(element);
        while (ptr >= 0) {
            var parentIndex = this.getParentIndex(ptr);
            if (this.comparator(this.arr[ptr], this.arr[parentIndex])) {
                this.swap(parentIndex, ptr);
            }
            else {
                break;
            }
            ptr = parentIndex;
        }
    };
    
    this.pop = () => {
        var element = this.arr[0];
        if (this.arr.length === 1) {
            return this.arr.pop();
        }
        
        this.arr[0] = this.arr.pop();
        var ptr = 0;
        while (this.arr[ptr] !== undefined) {
            var childIndex = this.getChildIndex(ptr);
            var left = childIndex[0];
            var right = childIndex[1];
            // The current node has no children nodes.
            if (this.arr[left] === undefined) {
                break;
            }
            
            // The current node has only left child.
            if (this.arr[right] === undefined) {
                if (this.comparator(this.arr[left], this.arr[ptr])) {
                    this.swap(left, ptr);
                }
                break;
            }
            else {
                if (this.comparator(this.arr[left], this.arr[right])) {
                    if (this.comparator(this.arr[ptr], this.arr[left])) {
                        break;
                    }
                    this.swap(ptr, left);
                    ptr = left;
                }
                else {
                    if (this.comparator(this.arr[ptr], this.arr[right])) {
                        break;                   
                    }
                    this.swap(ptr, right);
                    ptr = right;
                }
            }
        }
        return element;
    };
    
    this.comparator = (a, b) => a < b;
    this.isEmpty = () => this.arr.length === 0;
    this.getParentIndex = (i) => i === 0 ? undefined : Math.ceil(i / 2.0) - 1;
    this.getChildIndex = (i) => [2 * i + 1, 2 * i + 2];
    this.swap = (i, j) => {
        if (i >= 0 && i < this.arr.length && j >= 0 && j < this.arr.length) {
            var tmp = this.arr[i];
            this.arr[i] = this.arr[j];
            this.arr[j] = tmp;
        }
    };
}

function getSuccessors(state) {
    var state = state.split('-');
    var row = parseInt(state[0]);
    var col = parseInt(state[1]);
    var successors = [];
    
    successors.push('' + row + '-' + (col - 1));
    successors.push('' + (row + 1) + '-' + col);
    successors.push('' + row + '-' + (col + 1));
    successors.push('' + (row - 1) + '-' + col);

    return successors;
}