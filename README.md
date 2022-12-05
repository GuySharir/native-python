
# native-python

A clean and easy way to run python functions in Node.js in a way that almost feel native.

## Features

- No additional python packages needed
- Light weight
- Supports python 3.x 
- Supports multipule return values and multipule function params
- Cross platform 
- Supports function timeout
- Enables control over stdio


## Installation

Install package with npm

```bash
  npm i @guydev/native-python
```
    
## Usage/Examples

#### import package 
```javascript
import { runFunction } from '@guydev/native-python'

```

#### Basic usage - no iput provided
```javascript
import { runFunction } from '@guydev/native-python'

const example = async () => {

    const { error, data } = await runFunction('/path/to/file.py', 'hello_world', '/path/to/python')

    // error will be null if no error occured.
    if (error) {
        console.log('Error: ', error)
    }

    else {
        console.log('Success: ', data)
        // prints data or null if function has no return value
    }
}
```

```python
# module: file.py

def hello_world():
    print('hello world')


```



#### Array input
###### * note params mapping from node by order to python function
```javascript
import { runFunction } from '@guydev/native-python'

const example = async () => {

    const input = [1,[1,2,3],{'foo':'bar'}]
    const { error, data } = await runFunction('/path/to/file.py', 'hello_world', '/path/to/python', input)

    // error will be null if no error occured.
    if (error) {
        console.log('Error: ', error)
    }

    else {
        console.log('Success: ', data)
        // prints data or null if function has no return value
    }
}
```

```python
# module: file.py

def hello_world(a,b,c):
    print( type(a), a) 
    # <class 'int'>, 1

    print(type(b),b)
    # <class 'list'>, [1,2,3]

    print(type(c),c)
    # <class 'dict'>, {'foo':'bar'}
```


#### File input
##### file must be .json file
```javascript
import { runFunction } from '@guydev/native-python'

const example = async () => {

    const input = "/path/to/input.json"
    const { error, data } = await runFunction('/path/to/file.py', 'hello_world', '/path/to/python', input)

    // error will be null if no error occured.
    if (error) {
        console.log('Error: ', error)
    }

    else {
        console.log('Success: ', data)
        // prints data or null if function has no return value
    }
}
```
```json
[
    1,[1,2,3],{"foo":"bar"}
]
```


#### stdout and timeout
##### function timeout 15 seconds and python script will inherit the process stdout.
##### python prints will be bufferd, force unbuffering by: print("some message",flush=True).
##### flushing output this might affect performence
```javascript
import { runFunction, InputType } from '@guydev/native-python'

const example = async () => {
    const input = "/path/to/input.json"
    const { error, data } = await runFunction('/path/to/file.py',
                                              'hello_world',
                                              '/path/to/python',
                                               input,
                                               true,
                                               15 * 1000)

    // error will be null if no error occured.
    if (error) {
        console.log('Error: ', error)
    }

    else {
        console.log('Success: ', data)
        // prints data or null if function has no return value
    }
}
```