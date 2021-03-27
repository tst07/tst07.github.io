Title: Pyspark: Basics And Computation Of Cluster Strength for Spark Jobs
Date: 27 March 2021
Tags:  pyspark
Slug: pyspark_basics_and_computing_cluster_requirement_for_jobs
Authors: Prakhar Mishra
Summary: In this article author discusses about the basic terminologies of spark and how to compute the cluster hardware to run the spark jobs efficiently.

When I started on working with pyspark to explore big data horizon, I was told by the experienced engineers the dos and donts of running a spark project. I was supposed to follow their rules until I
get good enough and understand the underlying intrinsic details of spark so that I don't fuck up the project and give my teammates some sleepless nights :)

Luckily it didn't happen and now that I have gathered the knowledge, Its time to give back to my fellow engineers who are starting their big data journey. When starting out, my collegue told me that
whenever you write an instruction, whether a transformation/collection or a loading functions in your code, always ask yourself if this will be able to run on a single machine itself. This will help
you keep away from traditional programming logics and everything else would follow with googling and figuring out how to do the task in distributed manner.

In this article, Let's discuss some spark terminologies and figure out what cluster requirements are for runnning our spark jobs efficiently.

### Cluster: 
Cluster is nothing but a set of computers dedicated to run our spark job on huge data. It can comprise of multiple servers, each server can be multicore and with some dedicated memory to it.
Let's say we have a cluster of 10 nodes, each node has 16 cores and 64GB RAM attached to it.


### RDD: 
RDD stands for resilient distributed dataset, which is more often called the fundamental data structure of spark. Think of RDD as a large data which will be first loaded and then divided into partitions
by spark to achieve parallel execution on these partitions. RDD can be loaded to spark from HDFS, Database or from a huge file sitting in a disk. 


### DataFrame: 
DataFrame is API written over RDD, which is used when you have structured data (data for which you can imagine a schema). While stored data can be very chaotic, if you happend to have a schema based 
dataset, it is highly recommended to not use RDD and use DataFrame API since it already has many optimizations out of the box.


### Partition: 
The smallest unit of large data which goes to the cluster and gets modified or transformed by spark job! Suppose we have a 200G file which is loaded in our rdd, spark is going to divide the RDD into 
chunks of 128MB size partitions and perform the operations parallely on these chunks by sending them to various nodes in our cluster. Ideally partition size should not exceed more than 128MB.
So for a 200G file, number of partitions will be 200*1024/128 = ~1600


### Task: 
Task is a unit of work which will be done on a partition. One can have as many tasks as number of partitions, which will enable parallel execution of all partitions in same 'stage' (more on stage later).
If you have more tasks available than partitions, then some will be idle. If you have less tasks than partitions then some partitions will have to wait for the tasks to finish their existing work 
and then pick them up.


### Executor: 
An executor is a process which combined with other identical executers run on a single server. Yes, that is correct, a single machine in a cluster can have multiple executors. Each executor can have
capacity of running multiple tasks. Number of tasks and number of executor in a machine depend on the machine's CPU cores.
For best practices, an executor is not assigned more than 5 cores. So suppose you have 32 core machine, then you can run 32/5 = 6 executors in that machine. Assigning more cores to an executor is shown
to slow down the jobs significantly. So remember this, 5 or less cores per executor!!! Which will correlate to running 5 or less tasks per executor.
We will further read about the 'shuffle block' and HDFS also performs best with 5 task per executor.


* For an example, we have cluster of 10 machines, each have 32 Core CPU and 64 GB memory. Let's derive how many executors and tasks we will be able to run parallel.

* As we discussed earlier, number of executors per machine is 32/5 = ~6. 

* How much memory each executor will have? Answer is 64G/6 = ~10 GB.

* So, how many total executors will be available across cluser? no_of_executor_in_single_machine * no_of_machines =  6 * 10 = 60

* How many tasks we will have at hand at a time? no_of_executors*no_of_cores_per_executor = 60 * 5 = 300 tasks!

One more thing that we need to be careful about is that our executors should not transfer more than 2G data to each other. Otherwise we will see 'size limit exceed' error while running our jobs. 
This transfer of data between executors across stages is called ** Shuffle Block **. Normally when you are using 5 cores per executor and partitions are 128MB, this problem won't arise.


### Worker: 
Each node in cluster will have single worker. This worker will manage all the executors running in that node and contact with cluster manager about the availability of executors. Each application or job
run will have it's own set of executors. One can think of running more than one worker instance in a node, but it simply isn't effective in improving efficiency since it is merly used for tracking 
executors and contacting cluster manager.


### Cluster Manager:
Spark can use various cluster manager such as yarn, mesos or standalone. In Spark's standalone CM, you can see job statistics, information about executors, memory consumption, concurrent running tasks 
etc. Worker instance has the responsibility of communication with cluster manager about the availability of it's resources. Once an executor is assigned to the job, it can directly communicate with 
driver job without interfering with worker or cluster manager.



## How spark runs a job:
You can tell spark that it's lazy without hurting it's feelings. Spark delays execution of tasks as long as it can. All data transformation steps which we are writing are not happening until we 
explicitly ask to collect our output or the next stage of job depend on the results of previous stage. Behind the scenes spark creates a directed acyclic graph containing all the operations, then
proceeds to run that in stages. It optimizes the number of as many tasks which can run parallel in one stage, and then pass the output of the stage to next and proceeds to run next stage similarly.
In more stepwise manner, this is what happens when we run our job:

+ Spark builds a DAG according to our job.
+ Split the graph into stages of tasks.
+ Run first stage tasks with help of cluster manager to assign executors
+ collect back results from executors as output or proceed to next stage with results.
+ And so on..


While complete workflow can get much more complex including retrying failed tasks, scheduling tasks. This is the most simplistic way on how spark workflow happens behind the scenes.
I hope you enjoyed this blog and got basic idea about the workings of spark. I will see you in the next one!!
 


___

** DISCLAIMER: ** The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share
your further learnings in the comments below as well.
