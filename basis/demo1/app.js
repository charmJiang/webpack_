
// import 'babel-polyfill'
console.log('123')

let func = () => {
    console.log('456')
}

func()

class A {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
}

var a = new A('alex', 20)
console.log(a.name, a.age)

let promise = new Promise((resolve, reject) => {
    let a = 20;
    let b = 30;
    console.log(a)
    resolve(b)
})

promise.then(data => {
    console.log('b is', data)
})

async function F() {
    let c = 2;
    await (c = c + 2)
    console.log('c is ', c)
}
F()