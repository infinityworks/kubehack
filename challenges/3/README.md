# Challenge 3


Let's go crazy. We're going to put together a Todo app backed by MongoDB on our cluster.

## MongoDB Setup

To start, we need some persistent storage for our mongo cluster. You can do this by running:

`kubectl apply -f ./googlecloud_ssd.yml`

This will create a Persistent Disk in Google Compute Engine and attach it as a StorageClass to Kubernetes. We can then use it to persist data from our MongoDB containers using something called a Persistent Volume Claim.

When we create the Mongo cluster, we will use a special type of set, called a Stateful Set. This is different to Replica Sets, in that it doesn't create a load balancer for connecting to the pods, it instead uses the internal DNS provided with Kubernetes to handle connections. Do this with

`kubectl apply -f ./mongo_statefulsets.yml`

Once this is complete, you can see the Mongo pods in the normal way with `kubectl get pods`:

```
NAME                        READY     STATUS    RESTARTS   AGE
mongo-0                     2/2       Running   0          9m
mongo-1                     2/2       Running   0          8m
mongo-2                     2/2       Running   0          8m
nginx-3449338310-92mm9      1/1       Running   0          1h
nginx-3449338310-q94dj      1/1       Running   0          1h
nginx-3449338310-qh4b9      1/1       Running   0          1h
todo-app-2050343677-xbvnb   1/1       Running   0          6m
```

Note that in the mongo pods, they don't have a unique ID attached to them and are instead named by the index of the pod as they were created.

If you now run `kubectl get services`, you can see something interesting about the mongo services created:

```
NAME            CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE
kubernetes      10.3.240.1     <none>           443/TCP        8d
mongo           None           <none>           27017/TCP      35m
nginx-service   10.3.241.102   104.199.19.249   80:31533/TCP   1h
```

Note that the Cluster IP value is set to 'None', confirming that no load balancer has been attached to this service. You can connect to these instances internally through the cluster with DNS name in the following format:

```
<pod_name>.<service_name>
```

So, to connect to our mongo instances, we would use the following DNS names:

```
mongo-0.mongo
mongo-1.mongo
mongo-2.mongo
```

And a MongoDB replicaset (not to be confused with a Kubernetes replica set) connection string would look something like this:

```
mongodb://mongo-0.mongo,mongo-1.mongo,mongo-2.mongo:27017
```

## Deploying the Todo App

Much like before with what we did for nginx, let's create a deployment for our Todo app. The container we're using is publically available on Docker Hub as `infinityworks/todo-app`

Create the deployment:

`kubectl run todo-app --image=infinityworks/todo-app --port=8080`

Expose the application:

`kubectl expose deployment todo-app --type=LoadBalancer --name=todo-service --port=80 --target-port=8080`

When the Todo service has finished creating the ingress, you should be able to open your Todo app in a browser

Services example:
```
NAME            CLUSTER-IP     EXTERNAL-IP       PORT(S)        AGE
kubernetes      10.3.240.1     <none>            443/TCP        8d
mongo           None           <none>            27017/TCP      51m
nginx-service   10.3.241.102   104.199.19.249    80:31533/TCP   1h
todo-service    10.3.242.51    104.155.109.212   80:32166/TCP   10m
```

# Credits

* [MongoDB setup](http://blog.kubernetes.io/2017/01/running-mongodb-on-kubernetes-with-statefulsets.html)
* [Todo App](https://github.com/marianoc84/node-todo-docker)
