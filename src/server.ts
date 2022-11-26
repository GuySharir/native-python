import express from 'express'
import cors from 'cors'


export const startServer = () => {
    const app = express()
    const port = 3000

    app.use(cors({
        origin: '*'
    }))

    app.use(express.urlencoded({ extended: true }));

    app.post('/', (req, res) => {
        console.log(req.body)
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}