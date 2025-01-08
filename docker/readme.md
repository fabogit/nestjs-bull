## Build app image from project /

```
docker build -t nestjs-bull:latest -f docker/Dockerfile .
```

check in `docker images`

## Enable k8s cluster

check and setup `minikube` if needed

```
minikube version
minikube start --driver=docker
minikube status
```

## Load image and create new deployment

```
minikube image load nestjs-bull:latest
kubectl get nodes
```

`kubectl create deployment nestjs-bull --image=nestjs-bull:latest --port 3000 --dry-run=client -o yaml > "k8s/nestjs-bull/templates/deployment.yaml"`

`helm install nestjs-bull ./k8s/nestjs-bull/`

check

`kubectl get pods`

### To get logs from server:

`kubectl logs PODNAME`


`kubectl get services`

`kubectl expose deployment nestjs-bull --type=NodePort --port 3000 --dry-run=client -o yaml > "k8s/nestjs-bull/templates/service.yaml"`