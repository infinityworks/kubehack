# Challenge 1

Let's get a pod running.

`kubectl run nginx --image=nginx --port=80`

You should be able to run `kubectl get pods` now and see your new nginx container running on the cluster.

## From YAML

To create the deployment:

`kubectl create -f ./nginx.yml`
