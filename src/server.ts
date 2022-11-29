import express from 'express'
import { execa } from "execa";
import path from 'path';
import cors from 'cors'
import getPort from 'get-port';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const startServer = async (path: string, functionName: string, pythonPath: string, input: string, stdout: boolean = true) => {
    try {

        const app = express()
        let server = null;

        const result = await new Promise(async (resolve, reject) => {
            try {
                const port = await getPort({ port: 3030 })
                let pythonResult = null

                app.use(cors({
                    origin: ['localhost', '127.0.0.1']
                }))

                app.use(express.urlencoded({ extended: true }));

                app.post('/', (req, res) => {
                    pythonResult = JSON.parse(req.body.data)
                    res.send()
                })

                server = app.listen(port, async () => {
                    const child = execa(pythonPath, [`${__dirname}/python/wrapper.py`, '--path', path, '--function-name', functionName, '--port', port.toString(), '--input', input])

                    if (stdout)
                        child.stdout.pipe(process.stdout);

                    await child;
                    resolve({ data: pythonResult })
                })

            } catch (error) {
                reject({ error })
            };
        })

        if (server) server.close()
        return result

    } catch (error) {
        return error
    };
}