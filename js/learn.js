// let user1 = 'jack';
// let user2 = user1;
// console.log(user1);

// user2 = 'Rose'
// console.log(user1,user2)

// let arr1 = [1,2,3];
// let arr2 = arr1;
// console.log(arr2)

// arr2.push(4);
// console.log(arr1);
// console.log(arr2);

let arr1 = [1,2,3];
let arr2 = [...arr1];

arr2.push(4);
console.log(arr1);
console.log(arr2);

let obj1 = {a: 'a'};
let obj2 = {...obj1};

obj2.b = 'b';
console.log(obj1);
console.log(obj2);

// let user1 = {
//     name: 'Jack',
//     hobbies: [ 'coding','basketball' ]
// };
// let user2 = {...user1};

// user2.name = 'Rose';
// user2.hobbies.push('piano');
// console.log(user1);
// console.log(user2);

// let user1 = {
//     name: 'Jack',
//     hobbies: [ 'coding','basketball' ]
// };
// //stringify() Object to JSON  ____ parse() JSON to Object
// let user2 = JSON.parse(JSON.stringify(user1));

// user2.name = 'Rose';
// user2.hobbies.push('piano');
// console.log(user1);
// console.log(user2);

function cloneDeep(obj,map = new WeakMap()){
    //檢查傳入的參數是否為物件，如果不是則直接返回
    if (typeof obj != 'object' || obj === null){
        return obj;
    }
    //如果已經複製過了，直接返回之前複製的物件
    if(map.has(obj)){
        return map.get(obj);
    }
    //創建一個空的目標物件或陣列
    const cloned = Array.isArray(obj) ? [] : {};

    //將複製的物件放入MAP 中
    map.set(obj, cloned);

    // console.log(map.set(obj, cloned));
    
    //遍歷原始物件的所有屬性，並將深拷貝到目標物件中
    for(const key in obj){
        if(obj.hasOwnProperty(key)){
            cloned[key] = cloneDeep(obj[key],map);
        }
    }

    return cloned;
}

let user1 = {
    name: 'Jack',
    hobbies: [ 'coding','basketball' ],
    sayHi(){
        console.log(`Hi, ${this.name}`)
    }
};
user1.mySelf = user1;
let user2 = cloneDeep(user1);

user2.name = 'Rose';
user2.sayHi = function sayHi(){
    console.log(`Hello, ${this.name}`)
}
user1.mySelf.sayHi();
user2.mySelf.sayHi();

let arr = [1,2,3,4,5]
for( let element of arr ){
    console.log(element);
}
const obj = {
    a: 1,
    b: 2,
    c: 3,
}
const keys = Object.keys(obj)

for(const key in obj){
    const value = obj[key]
    console.log(value)
}

let users = {
    id1: {
        name: 'thisWeb1',
        password: 123
    },
    id2: {
        name: 'thisWeb2',
        password: 456
    },
    id3: {
        name: 'thisWeb3',
        password: 789
    }
}
console.log(users.id1)
let id = Object.keys(users);//單純將物件的key拿出來變成陣列
console.log(id); //[ 'id1','id2','id3' ]
let people = Object.values(users);//將物件裡的value轉成陣列
console.log(people[2]['name']); //thisWeb3
let userArr = Object.entries(users);//將key和value 都取出變成陣列
console.log(userArr); 
//[['id1',{...}],['id2',{...}],['id3',{...}]]
console.log(userArr[0][0]); //'id1'
console.log(userArr[0][1]); //{ name: 'thisWeb1', password: 123 }
console.log(userArr[1][0]); // 'id2'
console.log(userArr[1][1]); //{ name: 'thisWeb1', password: 123 }
// 工廠模式
// function createPerson(name, age){
//     let person = new Object();
//     person.name = name;
//     person.age = age;
//     person.sayName = function () {
//         console.log(this.name);
//     };
//     return person
// }

// let member1 = createPerson('bukeWeb', 18);
// console.log(member1);

// //構造函數模式
// function Person(name, age){
//     //誰使用New去掉用Person 誰就是屬於this
//     this.name = name;
//     this.age = age;
//     this.sayName = function(){
//         console.log(this.name);
//     }
// }
// function cat(name, age){
//     this.name = name;
//     this.age = age;
//     this.sayName = function(){
//         console.log(this.name);
//     }
// }
// let member1 = new Person('bukeWeb', 18);
// console.log(member1 instanceof Person) //true

function Person(name, age){
    this.name = name;
    this.age = age;
    this.sayName = function (){
        console.log(this.name);
    };
}
let person1 = new Person('theweb',18);//作為構造函數使用
Person('Shan',20);// 做為普通函數使用
window.sayName();//"Shan" 添加到window中 實際效果於test2.html