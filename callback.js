console.log("Start..");
getUser(1, (user) => {
    console.log("User", user);
    getUserRepo(user, (repo) => {
        console.log("User Repos", repo);
    })
})
console.log("End..");


function getUser(user, callback) {
    setTimeout(() => {
        callback({ id: user, name: "pankaj" })
    }, 2000)
}

function getUserRepo(user, callback) {
    setTimeout(() => {
        callback({
            id: 1, user: user, repo: {
                id: 120, title: "Hello"
            }
        })
    }, 2000)
}