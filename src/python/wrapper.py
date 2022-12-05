import importlib
from urllib import request, parse
import types
import importlib.machinery
import argparse
import json
from enum import Enum

class ResponseType(Enum):
    DATA = 1
    ERROR = 2
    


def run_module(module_full_path:str="",function_name:str="main",input:list=[]):
    # TODO: ADD VALIDATION FOR MODULE NAME AND PATH
    
    # get module name from path
    module_name = module_full_path.split("/")[-1]
    
    # load module
    loader = importlib.machinery.SourceFileLoader(module_name, module_full_path)
    mod = types.ModuleType(loader.name)
    loader.exec_module(mod)
    
    # get wanted function object from module
    func = getattr(mod, function_name)
    return func(*input)


def send_return_value(return_value,port,type=ResponseType.DATA):
    data = json.dumps(return_value)
    
    if type == ResponseType.DATA:
        parsedData = parse.urlencode({"data":data}).encode()
    
    else:
        parsedData = parse.urlencode({"error":data}).encode()
    
    url = f'http://127.0.0.1:{port}/'
    
    req=request.Request(url, data=parsedData)
    urlopen=request.urlopen(req)
    

            
        
if __name__ == "__main__":
    
    module_input = None

    try:
        # TODO: ADD VALIDATION CODE
        
        parser = argparse.ArgumentParser()
        parser.add_argument('--path')
        parser.add_argument('--function-name')
        parser.add_argument('--input')
        parser.add_argument('--port')

        args = vars(parser.parse_args())

        module_input = json.loads(args['input'])
            
        response = run_module(args['path'], args['function_name'], module_input)
        send_return_value(response,args['port'])
        
    except Exception as err:
        send_return_value(str(err),args['port'],ResponseType.ERROR)

