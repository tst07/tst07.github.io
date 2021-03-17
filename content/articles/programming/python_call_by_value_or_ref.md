Title: Python - Call By Value or Reference?
Date: 18 March 2021
Tags: python, interviews
Slug: python-call-by-value-or-reference
Authors: Prakhar Mishra
Summary: In this article we discuss if python is call by vallue or call by reference. Read this if you are particularly nerdy about the subject.

Programmers who start with C++ and then learn python often get confused with how python actually passes the variables to the functions. In C++, there is a clear distinction between call by value and 
call by reference which uses pointers, But in python there is no concept of a pointer. This also is a very popular question in python programming interviews, combined with the various other questions 
which often sound like "Will this variable be updated after this operation?".

Before we discuss the nature of python, we first have to identify how python actually stores the data behind the scenes.
Python contains two types of data structurs- Mutable (list, dictionary, sets etc.) and Immutable (numbers, strings , tuples etc). Mutable objects can be modified, Immutable objects are non-modificable.

Now, whenever you create a variable and initialize a data structure to it, what python actually doing is creating an object of that data structure and giving it a name which you picked as your
variable name. In a way, the variables in python are just names and nothing more than that! So an object can have multiple names, but what matters is all those name will point to the same object.
Much like in real life, where a person can be called by multiple names but the person remains the same. Let's see an example:

``` python
>>> x = 1 # Integer Object is assigned a name x
>>> y = x
>>> z = 1
>>> 
>>> print(id(x), id(y), id(z)) # all have same reference
4373842224 4373842224 4373842224
>>>
>>> li1 = [1, 2, 3]
>>> li2 = li1
>>> li3 = [1, 2, 3]
>>> 
>>> print(id(li1), id(li2), id(li3)) # li3 has a different object reference
4384778176 4384778176 4379968640
```

So what we end up realizing is, python is internally optimized for memory. It will create a new object when it really feels the need to create one. Otherwise it will keep reusing
and same object will be identified by multiple names.

Now lets check what the mainstream advice is in this matter:

+ If object is immutable then the modified value is not available outside the function.
+ If object is mutable then modified value is available outside the function.

No. Nope.. Not at all.
Let's check the example Below:

``` python
>>> def add_value_to_list(li):
...     li.append(10)
... 
>>> x = [1, 2, 3]
>>> add_value_to_list(x) # All well and good, since list is mutable, 10 will be appended to it and value will update outside function as well.
>>> x
[1, 2, 3, 10]
```

But now let's look at a contradictory example where 

``` python
>>> def change_to_dict(li):
...     li = {'a': 1}
...     print(id(li))
... 
>>> x = [1,2,3,4]
>>> id(x)
4373501888
>>> change_to_dict(x) # new reference value is assigned to li inside funtion. But outside, the reference and value remained the same as before.
4363534400
>>> x
[1, 2, 3, 4]
>>> id(x)
4373501888
```

What the frick?? Python.. why have you forsaken me here?

Well as much as we wanted to fit the two rules to find answers for all the questions, turns out they are not enough. Perhaps a much better answer to the question is, python decides internally when it is
sufficient to use same reference object and carry out modifications (called as pass by reference) OR should it create a new one entirely (called as pass by value).
In that sense, python is neither a call by value or a call by reference language.

I hope you liked this article. I will see you in the next one!

___

** DISCLAIMER: ** The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share
your further learnings in the comments below as well.
