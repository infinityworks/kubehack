# Challenge 2

Ok, so we've got a pod running. But how can we see it?

First things first, some things to be aware of:
* When creating a pod through kubectl, a replicaset of 1, and a deployment is automatically created.
* If you destroy the nginx pod, the replicaset and deployments will remain. You can remove all of them by removing the deployment.
  * To see replicasets, use the `kubectl get replicaset` command
  * To see deployments, use the `kubectl get deployment` command
* You can delete the nginx resource by running the `kubectl delete deployment nginx` command

We need to expose our container to the Internet now. We do this via services & ingresses. Thankfully, kubectl provides a nice command to do this for us:

`kubectl expose deployment nginx --type=LoadBalancer --name=nginx-service`

When you create an Ingress object in your cluster, Google Container Engine will create and attach a HTTP load balancer to it so it can automatically receive traffic. If you run:

`kubectl get services`

You will then be able to see your deployment be exposed on an External IP (it might say <pending> for a while, this means it's still creating the load balancer). You can then run a `curl` command on that IP to see the nginx welcome page.

You can also see the ingress via

`kubectl get endpoints`

## From YAML

To create the resources:

* `kubectl create -f ./deployment.yml`
* `kubectl create -f ./service.yml`
* `kubectl apply -f ./ingress.yml`
