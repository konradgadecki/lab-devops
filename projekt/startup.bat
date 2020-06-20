cd ./kubernetes

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f ./my-ingress-service.yml
kubectl apply -f ./myapp-configmap.yml
kubectl apply -f ./my-redis-deployment.yml
kubectl apply -f ./my-redis-service.yml
kubectl apply -f ./my-postgres-pvc.yml
kubectl apply -f ./my-postgres-secret.yml
kubectl apply -f ./my-postgres-deployment.yml
kubectl apply -f ./my-postgres-service.yml
kubectl apply -f ./my-backend-deployment.yml
kubectl apply -f ./my-backend-service.yml
kubectl apply -f ./my-frontend-deployment.yml
kubectl apply -f ./my-frontend-service.yml

cd ../