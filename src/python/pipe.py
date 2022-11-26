


from urllib import request, parse

t = { 'test1': 10, 'test2': 20 }
data = parse.urlencode(t).encode()
req =  request.Request("http://127.0.0.1:3000", data=data)
resp = request.urlopen(req)
print(resp.read())