import express from 'express'
import { execa } from "execa";
import path from 'path';
import cors from 'cors'
import getPort from 'get-port';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const response = {
    data: null,
    error: null
}


const runPythonWrapper = async (pythonPath, modulePath, functionName, port, input, stdout, timeout) => {

    try {
        console.log(input);
        const child = execa(pythonPath, [`${dirname}/python/wrapper.py`, "--path", modulePath, "--function-name", functionName, "--port", port.toString(), "--input", input])

        if (stdout)
            child?.stdout.pipe(process.stdout);

        setTimeout(() => {
            child.kill()
        }, timeout);

        await child;

    } catch (error) {
        response.error = "process terminated due to timeout";
        return
    };
}




const createServer = async (port) => {
    return new Promise(async (resolve, reject) => {
        try {
            const app = express();

            let server = null;

            app.use(cors({
                origin: ['localhost', '127.0.0.1']
            }));

            app.use(express.urlencoded({ extended: true }));

            app.post('/', (req, res) => {
                const { data, error } = req.body;

                if (data) response.data = JSON.parse(data);
                else response.error = JSON.parse(error);

                res.send()
            });

            server = app.listen(port, async () => {
                resolve(server)
            });

        } catch (error) {
            reject(error);
        };
    })
}


export const startServer = async (modulePath, functionName, pythonPath, input, stdout = true, timeout) => {
    try {
        const port = await getPort({ port: 3030 });
        const server = await createServer(port);

        await runPythonWrapper(pythonPath, modulePath, functionName, port, input, stdout, timeout);

        if (server) server.close();

    } catch (error) {
        response.error = error
    } finally {
        return response
    }

}

