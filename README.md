# Kubernetes Hack Night

Hack Night on the 1st June 2017. Playing around with Kubernetes on Google Cloud Platform.

## Google Cloud Setup

* Create an account and project on [Google Cloud Platform](https://cloud.google.com/)
  * NB: You will need to enter payment details, though new accounts are given $300 credits on the platform for the next 12 months and it will not charge after this period (according to Google). However, we recommend that you take precautions and destroy your cluster after you are finished.
* Navigate to the Google Container Engine dashboard in the Products & services navigation pane on the left hand side.
* Click the 'Create Cluster' button to open the cluster creation wizard.
  * Don't worry about most of the fields on this form, just give it a name and set the amount of nodes to 5 or less(6+ starts to charge you) and click 'Create'.

## Local Setup

* Install [Google Cloud SDK](https://cloud.google.com/sdk/)
  * Move the SDK somewhere sensible (and make sure your user is the owner of its parent folder). e.g. your home folder `~/google-cloud-sdk`
  * Run the `install.sh` script from the Google Cloud SDK folder to add the `gcloud` command to your PATH
* Run `gcloud components install kubectl` to install the Kubernetes CLI
* Run `gcloud init` to login to your Google Cloud Platform account. If it asks you to configure the Google Compute Engine, you don't need to do this.
* Open the Google Cloud Console, navigate to your cluster in the Container Engine, click the checkbox and then the 'Connect' button that appears. This should then prompt you with a command to configure kubectl with your cluster. (It should look something like `gcloud container clusters get-credentials cluster-1 \
    --zone europe-west1-c --project <project_id>`)
* Run `kubectl proxy`, then navigate to http://127.0.0.1:8001/ui to see the Kubernetes dashboard.

## Useful stuff

* [Kubernetes by Example](http://kubernetesbyexample.com/)
* [kubectl cheatsheet](https://kubernetes.io/docs/user-guide/kubectl-cheatsheet/)

## Hack away!

So you've setup your lovely cluster and you're happy that it's stable. Let's have a play around. Each challenge comes with a YAML configuration file for the final resources created.

You can watch your pods going up and down with the following command:

`kubectl get pods -w --all-namespaces`

### Challenge 1

Let's get a pod running.

`kubectl run nginx --image=nginx --port=80`

You should be able to run `kubectl get pods` now and see your new nginx container running on the cluster.

### Challenge 2

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


## Next Steps

Some ideas on things to look at next:

* [Next Steps](NEXTSTEPS.md)

## Resources

* [Tools](resources/tools.md)
* [Tutorials](resources/tutorials.md)
* [Platforms](resources/platforms.md)
* [Community](resources/community.md)
* [Monitoring](resources/monitoring.md)
