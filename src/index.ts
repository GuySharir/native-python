import { startServer } from './server.js'
import { InputType } from './types.js'
import { parseInput } from './parseInput.js'

export { InputType } from './types.js'

/**
 * @param fullPath {string} The full path to the python module.
 * example: fullPath = /path/to/python/module.py
 * 
 * @param functionName the name of the function to call from the module.
 * example: module.py contains the name of the function 'foo'
 * functionName = foo
 * 
 * @param pythonBinaryPath the path to the location of wanted python version to use.
 * example: /usr/bin/python
 * 
 * @param inputType the type of input provided, default is InputType.Param defined in InputType object exported from this module.
 * example: inputType = InputType.File  
 * if inputType is file then the input will be ignored and the function will use the inputPath instead.
 * 
 * @param input array of inputs to pass to the function. the input will be passed to the function by index.
 * example: input = ['foo' , [1,2,3,4], {'bar': 'baz'}] will invoke 
 * python_function('foo', [1,2,3,4], {'bar': 'baz'}) accordingly
 * 
 * @param inputPath the path to the input file.
 * this is only relevant if inputType == InputType.File.
 * in this case, the input param will be ignored and the file will be used.
 * the file must be a .json file containing an array of inputs by order.
 * 
 * @param stdout if true then the python stdout will be piped to current process stdout
 * 
 * @param timeout the timeout of the python function in ms.
 * default value 5 sec (1000 * 10).
 * example: 10_000
 * 
 * 
 */

export async function runFunction(
    fullPath: string,
    functionName: string,
    pythonBinaryPath: string,
    inputType: string = InputType.Param,
    input: any[] = [],
    inputPath: string = "",
    stdout: boolean = true,
    timeout: number = 1000 * 5) {

    // TODO: add validation that python executable actually exist
    // TODO: add abort controller

    try {

        const functionInput = await parseInput(inputType, input, inputPath);

        if (!functionInput.valid) {
            return { error: "error with the input" }
        }

        return await startServer(fullPath, functionName, pythonBinaryPath, functionInput.data, stdout, timeout);


    } catch (error) {
        console.log(error)
    }
}
