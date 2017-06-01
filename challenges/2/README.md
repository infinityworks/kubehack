# Challenge 2

Ok, so we've got a pod running. But how can we access it?
We need to expose our container to the Internet now. We do this via services & ingresses. Thankfully, kubectl provides a nice command to do this for us:

`kubectl expose deployment nginx --type=LoadBalancer --name=nginx-service`

When you create an Ingress object in your cluster, Google Container Engine will create and attach a HTTP load balancer to it so it can automatically receive traffic. If you run:

`kubectl get services -w`

Example output:
```
NAME         CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   10.3.240.1   <none>        443/TCP   8d
nginx-service   10.3.241.102   <pending>   80:31533/TCP   14s
nginx-service   10.3.241.102   104.199.19.249   80:31533/TCP   47s
```

you will then be able to see your deployment be exposed on an External IP (it might say `<pending>` for a while, this means it's still creating the load balancer). You can then run a `curl` command on that IP to see the nginx welcome page.

You can also see the ingress via

`kubectl get endpoints`

Example output:
```
NAME            ENDPOINTS           AGE
kubernetes      35.189.239.79:443   8d
nginx-service   10.0.2.17:80        2m
```

## From YAML

To create the resources:

* `kubectl create -f ./deployment.yml`
* `kubectl create -f ./service.yml`
* `kubectl apply -f ./ingress.yml`
