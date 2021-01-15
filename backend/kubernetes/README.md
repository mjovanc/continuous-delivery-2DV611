## TODO FOR PRODUCTION

### CHANGES TO NFS-CLIENT-PROVISIONER

- NFS_SERVER: 194.47.177.56
- NFS_PATH: /srv/nfs/kubedata

### CHANGES TO MASTER NODE

- /etc/kubernetes/manifests/kube-apiserver.yaml --enable-admission-plugins=NodeRestriction --> --enable-admission-plugins=NodeRestriction,DefaultStorageClass
- /etc/kubernetes/manifests/kube-apiserver.yaml ADD: --feature-gates=RemoveSelfLink=false

### CHANGES TO CLUSTERROLEBIND

`apiGroups: [""] resources: ["endpoints"] verbs: ["get", "list", "watch", "create", "update", "patch"]`
