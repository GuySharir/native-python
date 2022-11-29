// import { InputType, runFunction } from './native-python/src/index.js'
import { InputType, runFunction } from './index.js'

(async () => {
    const { error, data } = await runFunction('/Users/guyshenkar/Desktop/virtual/test.py', 'hello', '/usr/local/bin/python', 'param', [1, 2, 3, 4, 5])

    console.log(error)

    if (error) {
        console.log('Error: ' + error)
    }
    else {
        console.log('Success: ', data)
    }
})()



const example = async () => {
    const { error, data } = await runFunction('/path/to/file.py', 'functionName', '/path/to/python', 'Param', [1, 2, 3, 4, 5])

    // if an error occurred, the error message will be returned in 'error'
    if (error) {
        console.log('Error: ' + error)
    }

    // if the execution was successful, the return value will be returned in 'data'
    else {
        console.log('Success: ', data)
    }
}