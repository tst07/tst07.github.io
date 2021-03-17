Title: Design Patterns - Composite Pattern Implementation Using C++
Date: 17 March 2021
Tags: design-patterns, c++, interviews, object-oriented-programming
Slug: composite-pattern-using-cpp
Authors: Prakhar Mishra
Summary: Composite pattern code implementation using c++


We have already covered composite pattern implementation using python in a separate blog. 

In this blog, let's checkout how we can code using c++. We are implementing something similar to the linux file tree. 
Now let's get to the implementation. First we will create `filesystem.h` file where our pattern implementation will live:

``` cpp
#include<iostream>
#include<list>
using namespace std;


class IFileSystem {
protected:
    string name;
public:
    IFileSystem(string fname) {
        name = fname;
    }

    virtual void display() = 0;
    virtual void operation() = 0;

    virtual void addChild(IFileSystem *fs) {
        //
    }

    virtual void removeChild(IFileSystem *fs) {
        //
    }

};


class Dir: public IFileSystem {
protected:
    list<IFileSystem *> children;
public:
    Dir(string fname): IFileSystem(fname) {
        //
    }

    void display() {
        cout<<name<<endl;
    }

    void operation() {
        this->display();
        for(list<IFileSystem*>::iterator it =  children.begin(); it != children.end(); it++) {
            (*it)->operation();
        }
    }

    void addChild(IFileSystem *fs) {
        children.push_back(fs);
    }

    void removeChild(IFileSystem *fs) {
        list<IFileSystem*>::iterator it = std::find(children.begin(), children.end(), fs);
        children.erase(it);
    }
};


class LeafFile: public IFileSystem {
public:
    LeafFile(string fname): IFileSystem(fname) {
        //
    }

    void display() {
        cout<<name<<endl;
    }

    void operation() {
        this->display();
    }
};
```


Now, Let's create a `main.cpp` file to make use of our design pattern:

``` cpp
#include<iostream>
#include "filesystem.h"
using namespace std;

int main() {
    IFileSystem *root = new Dir("/");

    IFileSystem *home = new Dir("/home");
    IFileSystem *leafFile = new LeafFile("myfile");
    home->addChild(leafFile);

    IFileSystem *etc = new Dir("/etc");
    IFileSystem *var = new Dir("/var");
    IFileSystem *lib = new Dir("/lib");

    root->addChild(home);
    root->addChild(etc);
    root->addChild(var);
    root->addChild(lib);

    root->operation();

    return 0;
}
```

This was my implementation of linux file tree using c++, Try to run this on your machine and do tweaks and extensions as per your imagination.
I will see you in the next one!

** Related Links **

[Design Patterns - Composite Pattern Implementation Using Python](https://prakharmishra.com/articles/composite-pattern-using-python.html#composite-pattern-using-python)

___

** DISCLAIMER: ** The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share
your further learnings in the comments below as well.
