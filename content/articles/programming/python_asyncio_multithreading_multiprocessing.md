Title: Python - When To Use Asyncio/Multithreading/Multiprocessing
Date: 19 March 2021
Tags: python
Slug: python-multithreading-multiproceessing-or-asyncio
Authors: Prakhar Mishra
Summary: In this article we discuss the strategy to pick the right parallelization mudule for our use case.

Okay, even though we are restricted by the GIL (global interpreter lock) in python, we are still well equipped to face and solve any form of parallel or concurrent programming in python. Lot of people just read about
the GIL restrictions and then go "ohh this is so bad.. how python can be so popular even with a restriction like this?". But the truth is far from it, while in other languages multithreading is heart 
and soul to achieve parallelization, in python it is just a module to solve a particular type of use case. We are also provided other modules such as asyncio, multiprocessing, concurrent.futures and 
even celery for achieving concurrency and parallelization beyond a single machine. So which module is the best fit for our needs? Let's read ahead and find out!


** Multithreading: **

This is the most favourite thing about a language for programmers and whenever they switch to a language they will try to figure out how multithreading is implemented in that language.
In python, the multithreading is controlled  by GIL, which only allows one thread to run at a time. since python is built over C language, lot of libraries which had to be integrated from C to Python
required thread safe memory management otherwise the results would be inconsistent. So that's when it was decided to use GIL, it's one single lock to provide thread safe memory environment.

Now, does it make multithreading completely useless in python? No. What if we don't even have to run parallel threads in our program. Suppose our program needs IO operations in each thread, Do we really
care then if the cpu is taken away from that thread while the IO bound operation completes? CPU can be utilized by some other thread to complete its CPU bound stuff.
So in conclusion, if our problem statement is a mixture of CPU bound and IO bound tasks, python's multithreading can easily fit to solve the problem! Multithreading will help us achieve concurrency but 
not parallelization. But before you go on and implement the multithreading in your problem statement, we have to talk about asyncio and how it came to existence. 

** Asyncio: **

Consider you have implemented multithreading in your program, and then you realize that you don't actually need concurrent code execution, you just want to manage IO bound tasks effectively. The choke
point of your program is slow IO bound operations and running multiple threads is doing very little to none in helping achieving the efficiency. Moreover, you also want to have control over how and when 
the IO bound task are run since in multithreading, the cpu switching control lies with the library. All that power is provided to you by Asyncio. Consider using asyncio when your program has very slow
IO bound operations. For ex. if you have to fetch data from database where queries run for a long time, Asyncio is the best to adapt. Since there will be multiple connections needed to run multiple 
long running queries, Asyncio can fit to the problem easily. 

** Multiprocessing: **

Finding if multiprocessing is good fit for the problem is easy. Very little to no IO bound operations such as disk write, db queries, printer etc and more and more CPU powered instructions such as 
solving mathematical problems, doing calculations, computing digits of pi etc. If your program is CPU intrinsic, having more CPU or faster CPU will always make it faster.


** Celery: **

Celery is your friendly neighbourhood background worker. In celery, you can specify the number of workers (read process) and also concurrency level for each worker (which run as threads). Celery is 
decoupled with your app server, so it provides a much needed independent handling of both background tasks and app server. It is often used with web application development alongside frameworks such 
as Flask/Django. while managing state between multiple workers is not possible, but one can solve it creatively using cache such as redis (preferred) or saving state to DB as well. Celery also allows
you to go beyond a single server architecture, making use of multiple server to run your worker. Combine it with a massage queue such as RabbitMQ and consider all your problems found a solution.
You can run particular worker in a single server or in multiple servers, or you can also gather data returned by different workers across multiple servers to one specific server, all of these things
are possible through creative and careful configuration of celery. If that was not enough, celery also provides scheduling and periodic tasks as well. Say no to cron jobs which restrict you to a single
server or managing crons on different servers so they don't give you inconsistent data hence nightmares. While saying all the good things about celery is not possible in this short writeup, I think I 
have done the job to tell you how powerful celery can be in your python applications. So go on and give it a try and prepare to be blown away by the awesomeness!


** Final Note: **

So, I have listed (all?) the scenarios and conditions which I hope will help you in making decision to find the right module. A good project not just uses one of these libraries, but all of them 
depending upon the various kind of problems in the project. So mix them up, be careful that you are not under utilizing or overkilling with using one of them. And be a better programmer.
Also If you are going to the path of multithreading and multiprocessing, I recommend you to checkout the python3's concurrent.future module. It will make your code much short and easily understandable.
That's all for it, I will see you in the next one!


___

** DISCLAIMER: ** The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share
your further learnings in the comments below as well.
