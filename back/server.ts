import express from 'express';

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/calculate', (req, res) => {
    console.log(req.body)
    res.json({1:1})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
