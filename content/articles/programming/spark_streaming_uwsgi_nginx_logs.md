Title: Spark Streaming: combine uwsgi and nginx logs to get enriched log stream
Date: 13 April 2021
Tags:  pyspark
Slug: spark_streaming_combine_uwsgi_nginx_logs
Authors: Prakhar Mishra
Summary: In this article we combine uwsgi and nginx logs through spark streaming and get final enriched log stream

To get basic understanding of how spark streaming works, we are going to combine nginx(web server) logs and uwsgi logs. Spark streaming can process real time data from file systems, HDFS, TCP socket,
Kafka etc. I am assuming we have two different log files, uwsgi.log and nginx.log and the logs keep appending to the same file as requests are processed by our webserver and application.

If we use file system to read stream, we can only read data from files which are created new in our landing path. Once a file is processed in this case, spark does not go back to process again. This
kind of processing is not suited for our needs since our logs are appended in the same log file. So what we are going to do is, we will read the logs from socket in real time. Now to transfer logs which
are written in our files to a socket, we will be using folllowing commands:

```
tail -f uwsgi.log | nc -lk 9999
```

```
tail -f nginx.log | nc -lk 9990
```

This will watch for any logs which are appended to our log files and write to port 9999 and 9990 respectively.
Now we need to read the socket stream in our spark code. To do this, let's first initiate spark streaming context (ssc) with the help of spark context (sc). I will be joining both streams with help
of IP address then we will also filter out the values where url is not equal. After that we will have our final log stream.


``` python
from pyspark.streaming import StreamingContext

# ...
# ...

def analyze(sc):
    ssc = StreamingContext(sc, 5) # run batches after every 5 seconds

    # reading the stream from socket
    uwsgi_lines = ssc.socketTextStream(hostname = "x.y.z.w", port = 9999)
    uwsgi_lines_wo_static = uwsgi_lines.filter(lambda line: "static" not in line and ("GET" in line or "POST" in line or "PUT" in line))

    # Now transform the stream into pairs where first value in pair is equal to IP address. So this will help us joining two streams on basis of first value of pair.
    line_words = uwsgi_lines_wo_static.map(lambda x: x.split(" "))
    refined_uwsgi_logs = line_words.map(lambda x: (x[4], " ".join(line_words))) # for me IP address in 4th index

    # similarly for nginx we read stream from socket
    nginx_lines = ssc.socketTextStream(hostname = "x.y.z.w", port = 9990)
    nginx_lines_wo_static = nginx_lines.filter(lambda line: "static" not in line and "health" not in line and ("GET" in line or "POST" in line or "PUT" in line))

    # Now apply same logic, breaking to pairs
    ng_line_words = nginx_lines_wo_static.map(lambda x: x.split(" "))
    nrefined_logs = ng_line_words.map(lambda x: (x[2], " ".join(ng_line_words))) # for me IP address in 2nd index in nginx logs

    # Now lets join both streams, refined_uwsgi_logs, nrefined_logs
    joinedStream = refined_uwsgi_logs.join(nrefined_logs) # will join both streams based on first value of each tuple, IP address in our case
    final_stream_verbose = joinedStream.map(lambda line: line[1]) # removing tuples and keeping only second value of tuple
    final_stream_words = final_stream_verbose.map(lambda x: x.split(" "))  # break into list of words based on spaces between

    # Let's equate the URL and requestmethod (GET/POST etc) on joined stream, it will help us remove extra joined items.
    refined_final_stream_verbose = final_stream_words.filter(lambda x: x[2] == x[8] and x[3] == x[9])
    final = refined_final_stream_verbose.map(lambda x: [x[0], x[7], x[2], x[3], x[4], x[5], x[10], x[11]]) # pick the values we want to keep in final stream

    final.pprint()
    ssc.start()
    ssc.awaitTermination()

```


So this is how we joined two different stream of logs into one and removed junk lines. We can push the logs to different systems such as write on console, kafka, HDFS etc.
In new release spark has introduced spark structured streaming where data processed from streams gets written to unbounded table, from there we can apply dataframe operations on our running
stream and do stateful operations/queries as well which is a lot harder using traditional spark streaming where to apply some operations we have to work on RDD level. 

So this was a small use case that I could think of which can make use of spark streaming. I hope you found it useful, Thanks for reading the blog and I will see you in the next one.


** Related Links **

[PySpark Boilerplate - Best Practices Writing Production-Grade PySpark Jobs](https://developerzen.com/best-practices-writing-production-grade-pyspark-jobs-cb688ac4d20f)

___

** DISCLAIMER: ** The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share
your further learnings in the comments below as well.
