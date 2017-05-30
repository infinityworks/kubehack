# Next Steps

Deploying packaged applications to Kubernetes

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

### Deploying Prometheus

* Install Prometheus
    * `helm install --name hack-night-prometheus --set alertmanager.enabled=false stable/prometheus`
        * Example of passing configs via the `cli`, alternatively append `-f values.yml`
* Port forward Prometheus
    * `kubectl --namespace default port-forward $(kubectl get pods --namespace default -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}") 9090`
* Hit the UI
    * `http://127.0.0.1:9090/graph?g0.range_input=1h&g0.expr=kube_pod_container_info&g0.tab=1`
* Removing Prometheus
    * `helm delete --purge hack-night-prometheus`

### Deploying Grafana

* Install Grafana
    * `helm install --name hack-night-grafana stable/grafana`
* Port forward Grafana
    * `kubectl --namespace default port-forward $(kubectl get pods --namespace default -l "app=hack-night-grafana-grafana,component=grafana" -o jsonpath="{.items[0].metadata.name}") 3000`
* Get the password
    * `kubectl get secret --namespace default hack-night-grafana-grafana -o jsonpath="{.data.grafana-admin-password}" | base64 --decode ; echo`
        * Example of "secret" management
* Hit the UI
    * `http://127.0.0.1:3000/login`
* Removing Grafana
    * `helm delete --purge hack-night-grafana`

### Linking the two

* Listing the available services
    * Kubernetes UI > Services and discovery > Services
    * http://127.0.0.1:8001/api/v1/proxy/namespaces/kube-system/services/kubernetes-dashboard/#/service?namespace=default
* Getting the internal Prometheus service IP
    * Details > Connections > Internal endpoints
    * http://127.0.0.1:8001/api/v1/proxy/namespaces/kube-system/services/kubernetes-dashboard/#/service/default/hack-night-prometheus-server?namespace=default
        * `http://hack-night-prometheus-server:80`
* Setting up the data source in Grafana
    * Back to Grafana
        * http://127.0.0.1:3000/
    * `Create your first datasource`
        * Name: `Prometheus`
        * Type: `Prometheus`
        * Url: `http://hack-night-prometheus-server:80`
        * Add
            * Should respond with "Success - Data source is working"
        * Select the "Dashboards" tab
            * Prometheus Stats > Import
    * Viewing the first dashboard:
        * Grafana Logo > Dashboards > Home
        * Dashboard list (will say "Home") > Prometheus Stats
            * http://127.0.0.1:3000/dashboard/db/prometheus-stats?orgId=1
    * Viewing some Kubernetes stats:
        * Dashboard list > Import > Grafana.com Dashboard > `2115`
            * Select datasource/Prometheus: `Prometheus`
        * Now you should see a pretty broken Kubernetes Dashboard in Prometheus
            * http://127.0.0.1:3000/dashboard/db/kubernetes-cluster-monitoring-via-prometheus-v2?refresh=10s&orgId=1
