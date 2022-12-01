const express = require("express")
//const seedrandom = require("seedrandom")

//const rng = seedrandom(seed)

const app = express()

app.get('/', (req, res) => {
    console.log(req)
    res.send("hello world?")
});


app.listen(4749, () => {
    console.log("listening on port 4749")
})
