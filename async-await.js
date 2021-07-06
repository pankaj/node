
console.log("Start..");
// const userData = getUser(1)
//     .then(user => getUserRepo(user))
//     .then(repo => console.log(repo))
//     .catch(err => console.error(err.message));
async function useReporitories() {
    try {
        const user = await getUser(1);
        const userRepos = await getUserRepo(user);
        console.log(userRepos);
    }
    catch (err) {
        console.log(err.message);
    }
}


useReporitories();
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
            //reject(new Error("Hello .... Getting error.."))
        }, 2000)
    })

}