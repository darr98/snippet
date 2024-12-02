import functools

def log_arg(fn):
    def wrapper1(*k,**v):
        """hello"""
        print(k,v)
        return fn(*k,**v)
    return wrapper1
 

@log_arg
def compute(x,y,z = 1):
    """world"""
    print((x +y) *z)



compute(2,3)

print(compute.__doc__)

cache ={}
a  =(1,2)
cache[a] = 4
print(cache) 