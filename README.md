# Kubernetes Hack Night

## Google Cloud Setup

* Create a cluster on GKE

## Local Setup

* Install [Google Cloud SDK](https://cloud.google.com/sdk/)
  * Move the SDK somewhere sensible (and make sure your user is the owner of its parent folder). e.g. your home folder `~/google-cloud-sdk`
  * Run the `install.sh` script to add the `gcloud` command to your PATH
* Run `gcloud components install kubectl` to install the Kubernetes control CLI
* `gcloud init`
* Open the Google Cloud Console, navigate to your cluster in the Container Engine, click the checkbox and then the 'Connect' button that appears. This should then prompt you with a command to configure kubectl with your cluster. (It should look something like `gcloud container clusters get-credentials cluster-1 \
    --zone europe-west1-c --project <project_id>`)
* Run `kubectl proxy`, then navigate to http://127.0.0.1:8001/ui to see the Kubernetes dashboard.
