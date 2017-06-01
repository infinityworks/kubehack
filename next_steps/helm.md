# Deploying packaged applications to Kubernetes

## Helm

* Application packaging for Kubernetes
    * https://github.com/kubernetes/helm
    * https://github.com/helm

### charts

* An application packaged for Kubernetes
    * https://github.com/kubernetes/charts

### tiller

* Cluster service for managing deployed charts

### helm cli

* Local tool to interact with `tiller`

### monocular

* UI for listing available charts
    * https://kubeapps.com/
* Can be hosted on the cluster
    * https://github.com/helm/monocular

## Example

### Setup

* Install `helm` locally
    * https://github.com/kubernetes/helm/blob/master/docs/install.md
* Install tiller on the cluster
    * `helm init`
* Wait for `tiller` to deploy on the cluster
    * `kubectl get pods --all-namespaces -w`
