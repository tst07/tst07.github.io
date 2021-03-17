Title: Design Patterns - Composite Pattern Implementation Using Python
Date: 16 March 2021
Tags: design-patterns, python, interviews, object-oriented-programming
Slug: composite-pattern-using-python
Authors: Prakhar Mishra
Summary: Composite pattern code implementation using python


Composite pattern is a structural design patt...... Pfft! I am no good with definitions and most of the time I wouldn't even remember this implementation has even a name.
But having said this, software design patterns are one of the most awesome things there in software development that show true power of object oriented programming and provide 'neat' solution
to the coding challenges. While writing code, the probability to be working on an original problem is very slim, It's almost certain that some other programmer was also faced with the same problem in 
history and they had to write the solution for that. Over time many programmers found these repeated problems and decided to generalise the solution and coding style which we now call as the great
DESIGN PATTERNS!

These are the language which all programmers understand to quickly catch up with each other in terms of code. 

** Programmer1: **  "We have implemented this using decorator pattern."

** New hired programmer: ** "Ohh I know that! let me check out the code and see how the use case is molded to fit in the pattern!"

See? Easy. After you learn a pattern, try to internalise it with thinking various use cases where it can be useful. And the first time when you see a problem where the pattern will fit and you start
coding will be a happiest gotcha moment!

One of my favourite design pattern is composite pattern. I have used it so many times now that finding the application of it in a problem has become so natural.
I remember when the first time I read about it, The first application that came to my mind was File System of an operation system. How in Unix based system everything starts with a '/' and continue
to grow into directories and files from there. Each directory can contain files or more directories inside. So in that sense, files are leaf nodes of file tree and directories are intermediate nodes 
which can contain leaf nodes or more directory nodes. Perfect for composite pattern!


Now let's get to the implementation. We will create `composite.py` file where our pattern implementation will live:

``` python
from abc import ABCMeta, abstractmethod


class IFileSystem(metaclass = ABCMeta):
    _name = None

    @abstractmethod
    def operation(self, *args, **kwargs):
        pass

    @abstractmethod
    def display(self):
        pass


class Dir(IFileSystem):
    # _children = []
    # _name = None

    def __init__(self, dir_name, *args, **kwargs):
        self._name = dir_name
        self._children = []

    def operation(self):
        self.display()
        for obj in self._children:
            obj.operation()

    def display(self):
        print(self._name)

    def addChild(self, child, *args, **kwargs):
        self._children.append(child)

    def removeChild(self, child, *args, **kwargs):
        try:
            ind = self._children.index(child)
        except:
            raise Exception('No such item present')

        self._children.pop(ind)


class LeafFile(IFileSystem):
    # _name = None

    def __init__(self, file_name, *args, **kwargs):
        self._name = file_name

    def display(self):
        print(self._name)

    def operation(self):
        self.display()

```


Now, Let's create a `main.py` file to make use of our design pattern:

``` python
from composite import Dir, LeafFile

if __name__ == '__main__':
    root = Dir("/")
    opt = Dir("/opt")
    opt.addChild(LeafFile("myfile"))
    root.addChild(opt)
    root.addChild(Dir("/data"))
    root.addChild(Dir("/var"))
    root.addChild(Dir("/etc"))
    root.addChild(Dir("/home"))

    opt.operation()

```

This was my implementation of linux file tree using python, Try to run this on your machine and do tweaks and extensions as per your imagination.
I will see you in the next one!


** Related Links **

[Design Patterns - Composite Pattern Implementation Using C++](https://prakharmishra.com/articles/articles/composite-pattern-using-cpp.html#composite-pattern-using-cpp)

___

** DISCLAIMER: ** The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share
your further learnings in the comments below as well.
