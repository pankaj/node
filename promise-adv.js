const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("First.. Promise..")
        resolve(1)
        // reject(new Error("Opps..."))
    }, 2200)

})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Second.. Promise..")
        resolve(2)
    }, 2000)

})

Promise.all([p1, p2])
    .then(data => console.log(data))
    .catch(err => console.log(err.message))