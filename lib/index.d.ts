export { InputType } from './types.js';
/**
 * @param fullPath The full path to the python module.
 * example: fullPath = /path/to/python/module.py
 *
 * @param functionName the name of the function to call from the module.
 * example: module.py contains the name of the function 'foo'
 * functionName = foo
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
 */
export declare function runFunction(fullPath: string, functionName: string, pythonBinaryPath: string, inputType?: string, input?: any[], inputPath?: string, stdout?: boolean): Promise<any>;
