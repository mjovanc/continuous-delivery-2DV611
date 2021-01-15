# 2dv611-team2

## Setting up the pipline

### 1. Infrastructure

Start with running the Ansible playbook to provision and configure the infrastructure on CSCloud.

Remember the variable ENVIRONMENT_NAME to use in the following steps.

[Run the playbook](ansible/README.md)

### 2. Gitlab

#### 2.1 Create environment in Gitlab

Navigate to the environment page on Gitlab and create a new environment. Use the <ENVIRONMENT_NAME> as environment name.

Gitlab Project -> Operations -> Environments -> [New environment](https://gitlab.lnu.se/oh222fv/2dv611-team2/-/environments/new)

#### 2.2 Integrate Kubernetes cluster with Gitlab

##### 2.2.1 Get variables

Before integrating the cluster with Gitlab you need to SSH into the Ansible control node 
and retreive the file `gitlab.txt` that contains the credentials needed. 

The ENVIRONMENT_NAME variable should be replaced with the name of the environment that you created in the provious step.

##### 2.2.2 Navigate to the page for connecting a new cluster.

Gitlab Project -> Operations -> Kubernetes -> Connect cluster with certificate -> [Connect existing cluster](https://gitlab.lnu.se/oh222fv/2dv611-team2/-/clusters/new)

##### 2.2.3 Connect the new cluster.

Use the following variables when connecting to the new cluster.

Kubernetes cluster name: <ENVIRONMENT_NAME>     
Environment scope: <ENVIRONMENT_NAME>     
API URL: Found in gitlab.txt    
CA Certificate: Found in gitlab.txt    
Service token: Found in gitlab.txt    
Project namespace prefix (optional, unique): <ENVIRONMENT_NAME>   

#### 2.3 Add secret (for database)

```
kubectl create secret generic mariadb-secret \
  --from-literal=MYSQL_ROOT_PASSWORD=<ROOT_PASSWORD> \
  --from-literal=MYSQL_DATABASE=<DATABASE> \
  --from-literal=MYSQL_USER=<USER> \
  --from-literal=MYSQL_PASSWORD=<USER_PASSWORD> \
  --namespace <ENVIRONMENT_NAME>-<ENVIRONMENT_NAME>
```

#### 2.4 NFS

Start by logging to the kubernetes master node with SSH.

Before we create the kubernetes deployments we need to modify the kube-apiserver.yaml.
In the nfs-file folder in the git repository there is a file named kube-apiserver.yaml. On your kuberenetes master node navigate to
/etc/kubernetes/manifests/ and replace the already existing kupe-apiserver.yaml file with the one found in nfs-files.

After you have swapped the kube-apiserver.yaml file, navigate to the nfs-file folder in the git repository and run them in the following order from your kubernetes master node:

```
kubectl create -f rbac.yaml
kubectl create -f class.yaml
kubectl create -f deployment.yaml

kubectl get all --all-namespaces | grep nfs
```

The last command will grep everything that contains "nfs". Make sure everything is up and running and then proceed.

#### 2.5 Install Gitlab-runner in Kubernetes cluster

This runner will be used for deployment to the cluster

##### 2.5.1 Navigate to the page for installing runner

Navigate to the application page of the cluster on Gitlab and install Gitlab Runner:

Gitlab Project -> Operations -> Kubernetes -> <ENVIRONMENT_NAME> -> [Applications](https://gitlab.lnu.se/oh222fv/2dv611-team2/-/clusters/21?tab=apps) -> Gitlab Runner -> Install
   
#### 2.6 Install other Gitlab-runners

This runner will be used for the build and test stages. This runner could be installed on any instance that is accessible from the outside.

##### 2.6.1 Install docker on the system/instance where the runner should be installed.

```
sudo apt install docker.io
```

##### 2.6.2 Install Gitlab-runner

```
curl -LJO https://gitlab-runner-downloads.s3.amazonaws.com/latest/deb/gitlab-runner_amd64.deb

sudo dpkg -i gitlab-runner_amd64.deb
```

##### 2.6.3 Register the runner

REGISTRATION_TOKEN can be found in the project: Settings -> [CI/CD](https://gitlab.lnu.se/oh222fv/2dv611-team2/-/settings/ci_cd) -> Runners

GITLAB_RUNNER_NAME will be the name of the runner

```
sudo gitlab-runner register -n \
  --url https://gitlab.lnu.se/ \
  --registration-token <REGISTRATION_TOKEN> \
  --executor docker \
  --description "<GITLAB_RUNNER_NAME>" \
  --docker-image "docker:stable" \
  --docker-volumes /var/run/docker.sock:/var/run/docker.sock
```

## Documentation

Documentation for the backend can be seen in the file [backend/README.md](backend/README.md) and frontend in file [frontend/README.md](frontend/README.md).

## Team
Marcus Cvjeticanin - [@mjovanc](https://github.com/mjovanc)\
Olof Haga - [@ohaganight](https://github.com/ohaganight)\
Jesper Eriksson - [@JesperEriksson97](https://github.com/JesperEriksson97)\
Alex Karlsson - [@alexkarls](https://github.com/alexkarls)