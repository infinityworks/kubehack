# Challenge 1

Let's get a pod running.

`kubectl run nginx --image=nginx --port=80`

You should be able to run `kubectl get pods` now and see your new nginx container running on the cluster.

Example output:
```
NAME                     READY     STATUS    RESTARTS   AGE
nginx-3449338310-qh4b9   1/1       Running   0          6m
```

Some things to be aware of:
* When creating a pod through kubectl, a replicaset consisting of one pod and a deployment is automatically created.
* If you destroy the nginx pod `kubectl delete pod <pod_id>`, the replicaset and deployments will remain, and a new pod will be created in it's place. You can remove all of them by removing the deployment.
  * To see replicasets, use the `kubectl get replicaset` command
  * To see deployments, use the `kubectl get deployment` command
* You can delete the nginx resource by running the `kubectl delete deployment nginx` command

To scale your new nginx application, you can run the scale command on the deployment as follows:

`kubectl scale deployment nginx --replicas=3`

Running `kubectl get pods` will then output something like:
```
NAME                     READY     STATUS    RESTARTS   AGE
nginx-3449338310-92mm9   1/1       Running   0          41s
nginx-3449338310-q94dj   1/1       Running   0          41s
nginx-3449338310-qh4b9   1/1       Running   0          9m
```

Now you've done that, check out [Challenge 2](../2) to see how to expose Nginx and access it in your browser

## From YAML

To create the deployment:

`kubectl create -f ./nginx.yml`
