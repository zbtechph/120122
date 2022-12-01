const express = require("express")
const seedrandom = require("seedrandom")
const sha256 = require('js-sha256')
const port = process.env.port ?? 3000

const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.use('/', express.static('public'))

app.post('/execute', (req, res) => {
    const { seed, prizeCount } = req.body
    const entries = JSON.parse(req.body.entries) ?? ["no entries"]
	.reduce( (r, v) => r.find(t => t===v) ? r : [...r, v] , []) // remove duplicates
    const finalSeed = sha256(seed ?? "DefaultSeed")
    const rng = seedrandom(finalSeed)
    const draw = entries.map(entry => ({name: entry, rand: rng()})).sort((a,b) => b.rand-a.rand)
    const winners = draw.slice(0, parseInt(prizeCount ?? 1)).map(w=>w.name)
    res.send(JSON.stringify({ winners, entries: draw }))
});


app.listen(port, () => {
    console.log("listening on port "+port)
})
