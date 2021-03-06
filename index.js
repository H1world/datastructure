function deepFreeze(obj = {}) {
  let keyNamesArr = Object.getOwnPropertyNames(obj);

  keyNamesArr.forEach(value => {
    if (typeof obj[value] === 'object' && obj[value] !== null) {
      deepFreeze(obj[value]);
    }
  })

  return Object.freeze(obj);
}


function deepLoop(obj = {}) {
  // can not get Symbol key
  // let propNames = Object.getOwnPropertyNames(obj);

  let propNames = Reflect.ownKeys(obj);

  for (let name of propNames) {
    if (typeof obj[name] === 'object' && obj[name] !== null) {
      deepLoop(obj[name]);
    }
  }
  return 'done';
}


// binary search
function binarySearch(arr = [], target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = arr[mid];

    if (guess === target) {
      return mid;
    } else if (guess > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}

// linked list
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.size = 0;
    this.head = null;
  }

  append(target) {
    let node = new Node(target);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while(current.next) {
        current = current.next;
      }
      current.next = node;
      this.size += 1;
    }
  }

  delete(pos) {
    if (pos >= 0 && pos < this.size) {
      let current = this.head;
      let previous;
      let index = 1;

      if (pos === 0) {
        this.head = null;
      } else {
        while(index <= pos) {
          previous = current;
          current = current.next;
          index = index + 1;
        }
        previous.next = current.next;
        this.size  -= 1;
        return current.element;
      }
    } else {
      return null;
    }
  }

  insert(pos, target) {
    let node = new Node(target);

    if (pos >= 0 && pos < this.size) {
      let current = this.head;
      let previous;
      let index = 1;

      if (pos === 0) {
        this.head = node;
      } else {
        while(index < pos) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current;
        this.size += 1;
      }
    } else {
      return null;
    }
  }
}


// 选择排序
function findSmallestEle(arr = []) {
  return Math.min(...arr.map(value => value));
}

function findSmallestEle(arr = []) {
  let index = 0;
  let temp = arr[index];

  for (let i = 1; i < arr.length; i++) {
    if (temp > arr[i]) {
      temp = arr[i];
      index = i;
    }
  }
  return index;
}

function selectionSort(arr = []) {
  let newArr = [];

  while(arr.length > 0) {
    newArr.push(arr[findSmallestEle(arr)]);
    arr.splice(findSmallestEle(arr), 1);
  }

  return newArr;
}


// 队列
class queue {
  constructor() {
    this.arr = [];
  }

  enqueue(ele) {
    this.arr.push(ele);
  }

  dequeue(ele) {
    this.arr.shift(0, 1);
  }
}


// 欧几里得算法 最大公约数
function maxCommonDivisor(big, small) {
 if (small === 0) {
   return big;
 } else {
   return maxCommonDivisor(small, big % small);
 }
}

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex,1)[0];
  let less = [];
  let greater = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > pivot) {
      greater.push(arr[i]);
    }

    if (arr[i] < pivot) {
      less.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot],quickSort(greater));
}


// 归并排序
function mergeSort(arr) {}



function isPrime(number) {
  for (let i = 2; i < number; i++) {
    if (number % i === 0 || number === 1) {
      return false;
    }
  }
  return true;
}

function primeList(last) {
  let primeArr = [];
  for (let i = 2; i <= last; i++) {
    isPrime(i) && primeArr.push(i)
  }
  return primeArr;
}

function kp(number) {
  let primeArr = primeList(Math.floor(Math.sqrt(number)));
  let count = 1;
  console.log(count)

  primeArr.map(prime => {
    if (!isPrime(number) && prime) {
      if (number % prime === 0) {

        let quotient = number / prime;
        count = count + 1;
        // console.log(number, primeArr)
        // console.log(count)
        return kp(quotient);
      }
    }
  });
  console.log(count, 'bottom')
  // return count;
}

function countKprimes(k, start, end) {
  let kPrimeArr = new Set();

  for (let i = start; i <= end; i++) {
    for (let j = 0; j < primeArr.length; j++) {
      if (i % primeArr[j] === 0 && i !== primeArr[j]) {
        // kPrimeArr.add(i)
        if (k !== 0) {
          return countKprimes(k--, i, i / primeArr[j]);
        } else {
          console.log(end)
          if (primeArr.includes(end)) {
            kPrimeArr.push(start)
          }
        }
      }
    }
  }
  return Array.from(kPrimeArr);
}

function runYourString (arg, obj) {
  return new Function(obj.param, obj.func)(arg);
}

const compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => {
      return arg;
    }
  } else {
    return funcs.reduce((a, b) => (args) => a(b(args)));
  }
}

class Hex {
  constructor(number) {
    this.number = number;
  }
  
  static parse(string) {
    return /^0x+?/.test(string) ? Number(string) : Number(`0x${string}`);
  }

  toString() {
    return `0x${this.number.toString(16).toUpperCase()}`;
  }

  valueOf() {
    return this.number.valueOf();
  }

  toJSON() {
    return `0x${this.number.toString(16).toUpperCase()}`;
  }

  plus(num) {
    return this.number.valueOf() + num.valueOf();
  }

  minus(num) {
    return this.number.valueOf() - num.valueOf();
  }
}


// Array.prototype.groupBy = (fn) => {
//   this.
// }

//Which are in?找出array2中存在的array1数组 如果没有则返回空
function inArray(array1,array2){
  //...
  let a3 = array2.join(' ');
  let a = [];
  let a4 = array1.filter(item => 
  {  
    if(0 <= a3.indexOf(item)){
      a.push(item)
    }
  }
  );
  return a.sort();
}

//浅拷贝
function shallowCopy(subObj){
  if(!subObj || typeof subObj !== 'object'){
    console.log('你传入的不是对象!')
  }
  //判断subObj的类型
  var targetObj = subObj.constructor == Array ? [] : {};
  for(let i in subObj){
    //判断属于subObj原型链的项.
    if (subObj.hasOwnProperty(i)){
      targetObj[i] = subObj[i];
    }
  }
  return targetObj;
}

//深拷贝   json.parse
var deepCapy = ((subObj) => {
  if (!subObj || typeof subObj !== 'object') {
    console.log('你传入的不是对象!')
    return;
  }
  return window.JSON ? JSON.parse(JSON.stringify(subObj)) : console.log('不支持jsonapi')
})

// 数组遍历  返回由2 0 1 7组合成的所有组合数 <不是很懂>
let nummber = 2017;
let arr = String(nummber).split("");
function fn(arr, init = []) {
  return arr.reduce((t, i, k) => {
    const n = [...arr];
    n.splice(k, 1);
    return [...t, [...init, i], ...fn(n, [...init, i])];
  }, [])
}