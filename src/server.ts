import express from 'express'
import { execa } from "execa";
import path from 'path';
import cors from 'cors'
import getPort from 'get-port';
import { fileURLToPath } from 'url';
import { Response } from './types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const startServer = async (path: string, functionName: string, pythonPath: string, input: string, stdout: boolean = true, timeout: number): Promise<Response> => {
    try {

        const app = express()
        let server = null;

        const result = await new Promise(async (resolve, reject) => {
            try {
                const port = await getPort({ port: 3030 })
                let data = null
                let error = null

                app.use(cors({
                    origin: ['localhost', '127.0.0.1']
                }))

                app.use(express.urlencoded({ extended: true }));

                app.post('/', (req, res) => {
                    ({ data, error } = JSON.parse(req.body.data))
                    res.send()
                })

                server = app.listen(port, async () => {
                    try {
                        const child = execa(pythonPath, [`${__dirname}/python/wrapper.py`, '--path', path, '--function-name', functionName, '--port', port.toString(), '--input', input])

                        if (stdout)
                            child.stdout.pipe(process.stdout);

                        setTimeout(() => {
                            child.kill()
                        }, timeout);

                        // const { stderr } = await child;
                        await child;
                        console.log(child.exitCode)

                        console.log(data, error)

                        resolve({ data: data })

                    } catch (error) {
                        // console.log(error)
                        console.log(error, data)
                        resolve({ error: "process terminated due to timeout" });
                    };

                })

            } catch (error) {
                console.log("here")
                resolve({ error })
            };
        })

        if (server) server.close()

        return result

    } catch (error) {
        return { error }
    };
}