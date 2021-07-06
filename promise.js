const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ id: 1, name: "pankaj saini" })
        //reject(new Error("Something went worong...."))
    }, 2000)

})

// const result = p.then(res => console.log(res))
//     .catch(err => console.log(err.message))


// convert callback to promise   


console.log("Start..");
const userData = getUser(1)
    .then(user => getUserRepo(user.id))
    .then(repo => console.log(repo))
    .catch(err => console.error(err.message));

console.log("End..");


function getUser(user) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: user, name: "pankaj" })
        }, 2000)
    })

}

function getUserRepo(user) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1, user: user, repo: {
                    id: 120, title: "Hello"
                }
            })
        }, 2000)
    })

}