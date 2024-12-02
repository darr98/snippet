from functools import __annotations__
def test(function) : 
    expect = function.__annotations__
    t  = all(map(lambda x : type(x)  ==type , expect.values()))
    print(t)
    def wrapper(*args , **kawtrgs):
        return function(*args ,**kawtrgs)
    
    return wrapper
    for j  in t:
        print(j)
    return t

@test
def test1(a : int,b :str) ->bool :  
    return 'gi'  



print('helo')
print(type(int))

for i in range*()




