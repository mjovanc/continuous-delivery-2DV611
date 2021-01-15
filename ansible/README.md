# Ansible

## Introduction

This playbook will create the initial infrastructure on the Cscloud/OpenStack cloud including a internal network, 
a subnet and a router. It will also create four instances. 

Docker, Kubernetes and Calipso will be installed on each instance. The Kubernetes cluster will be initialized on the Ansible master node. 
The other three instances will each act as a Kubernetes node and be connected to the master node with the help of Calipso.
Helm will also be installed on the master node and be used to install a nginx ingress controller to the cluster.


## Preparations

Add clouds.yaml (with your cscloud/openstack credentials) to the following paths:

`/`  
`/roles/kubernetes-master-install/files/nodes/`  

Add the public IP that will be used for your Ansible control node/Kubernetes master instance to the following fields:

`/group_vars/all.yaml` - `master_ip: The public ip of the Ansible master instance`  
`/roles/kubernetes-master-install/files/kubeadm.yaml` - `certSANs: Same as above`  

Add the key name to the key pair that will be used for the Ansible control node/Kubernetes master instance to the following field:

`/group_vars/all.yaml` - `master_key: The name of the private key used for SSH connection`  

Add the name of the environment to the following fields:  

`/group_vars/all.yaml` - `ENVIRONMENT_NAME: The name of the environment (eg. production)`  
`/roles/kubernetes-master-install/files/nodes/group_vars/all.yaml` - `ENVIRONMENT_NAME: Same as above`    

## Execution

Navigate to the ansible folder.

#### Initialize

ansible-playbook site.yml

#### Remove instances

ansible-playbook delete_instances.yml

#### Remove network

ansible-playbook delete_site.yml

## Team
Marcus Cvjeticanin - [@mjovanc](https://github.com/mjovanc)\
Olof Haga - [@ohaganight](https://github.com/ohaganight)\
Jesper Eriksson - [@JesperEriksson97](https://github.com/JesperEriksson97)\
Alex Karlsson - [@alexkarls](https://github.com/alexkarls)
