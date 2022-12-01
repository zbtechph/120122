const express = require("express")
const seedrandom = require("seedrandom")

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use('/', express.static('public'))

app.post('/execute', (req, res) => {
    const { seed, prizeCount } = req.body
    const entries = JSON.parse(req.body.entries)
    const rng = seedrandom(seed)
    const draw = entries.map(entry, ({name: entry, rand: rng()})).sort((a,b)=>a.rand-b.rand)
    res.send(JSON.stringify(draw.splice(0,prizeCount)))
});


app.listen(4749, () => {
    console.log("listening on port 4749")
})
