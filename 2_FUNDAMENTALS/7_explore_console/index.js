//mais de um valor

const x = 10;
const y = "Test";
const z = [1, 2];

console.log(`${x} ${y} ${z}`); //10 Test 1,2

//contador

console.count(`The value of X is, ${x}, contagem`); //The value of X is, 10, contagem: 1
console.count(`The value of X is, ${x}, contagem`); //The value of X is, 10, contagem: 2
console.count(`The value of X is, ${x}, contagem`); //The value of X is, 10, contagem: 3
console.count(`The value of X is, ${x}, contagem`); //The value of X is, 10, contagem: 4
console.count(`The value of X is, ${x}, contagem`); //The value of X is, 10, contagem: 5

//limpar console
setTimeout(()=>{
  console.clear()
}, 5000)