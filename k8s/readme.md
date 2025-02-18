## Build app image from project /


```bash
docker build -t fabodhub/nestjs-bull:latest .
```

```bash
docker image push fabodhub/nestjs-bull:latest
```

check `docker images`

## Enable k8s cluster

check and setup `minikube` if needed

```bash
minikube version
minikube start --driver=docker
minikube status
minikube stop
minikube delete --all
```

## Load image and create new deployment
we build using https://artifacthub.io/packages/helm/bitnami/redis and fabodhub/nestjs-bull

```bash
cd ./k8s
helm create nestjs-bull
cd nestjs-bull/
helm dependency update
```

create deployment and install from chart.yaml

```bash
kubectl create deployment nestjs-bull --image=fabodhub/nestjs-bull:latest --port 3000 --dry-run=client -o yaml > deployment.yaml
```

deploy

```bash
helm install nestjs-bull .
```

check

`kubectl get pods`

### To get logs from server:

```bash
kubectl logs POD_NAME
kubectl get services
```

### Expose port to enable comunication over http

`kubectl expose deployment nestjs-bull --type=NodePort --port 3000 --dry-run=client -o yaml > service.yaml`

check redis master name and port

```bash
kubectl get services
helm upgrade nestjs-bull .
kubectl get services
```

will now show the exposed port

```
NAME                         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes                   ClusterIP   10.96.0.1       <none>        443/TCP          20m
nestjs-bull                  NodePort    10.108.178.39   <none>        3000:PORT_NUMBER/TCP
```

`kubectl logs -l app=nestjs-bull --follow`

send a `POST` request on `localhost:PORT_NUMBER/transcode`
