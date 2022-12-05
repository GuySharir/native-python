import { startServer } from './src/server.mjs'
import { parseInput } from './src/parseInput.mjs'


/**
 * @param {string} moduleFullPath  The full path to the python module.
 * example: fullPath = /path/to/python/module.py
 * 
 * @param {string} functionName the name of the function to call from the module.
 * example: module.py contains the name of the function 'foo'
 * functionName = foo
 * 
 * @param {string} pythonBinaryPath the path to the location of wanted python version to use.
 * example: /usr/bin/python
 * 
 * @param {any[] | string } input optional - default null could be an array of inputs to pass to the function. the input will be passed to the function by index.
 * example: input = ['foo' , [1,2,3,4], {'bar': 'baz'}] will invoke 
 * python_function('foo', [1,2,3,4], {'bar': 'baz'}) accordingly
 * or- input can be a full path to a json file containing an array to use as input.
 * 
 * @param {boolean} stdout optional - default true, if true then the python stdout will be piped to current process stdout
 * 
 * @param {number} timeout optional - the timeout of the python function in ms.
 * default value 5 sec (1000 * 5).
 * example: 10000
 * 
 * 
 */

export async function runFunction(
    moduleFullPath,
    functionName,
    pythonBinaryPath,
    input = null,
    stdout = true,
    timeout = 1000 * 5) {

    // TODO: add validation that python executable actually exist
    // TODO: add abort controller

    try {

        const functionInput = await parseInput(input);

        if (!functionInput.valid) {
            return { error: "error with the input, please refer to docs for instructions" }
        }

        console.log(functionInput.data)

        return await startServer(moduleFullPath, functionName, pythonBinaryPath, functionInput.data, stdout, timeout);


    } catch (error) {
        return ({ error, data: null })
    }
}
