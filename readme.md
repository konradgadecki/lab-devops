# Laboratorium z Wybranych technologii DevOps, IV semestr

#notes
#LAB 1

Zaliczenie:
Nginx server serwuje apke frontendowa
My app
Front + backend

Posgres + redis

Docker - konteneryzacja 
Kubernetes.io - orkiestracja

Linux <- pelne prawa - konieczna jest maszyna virtualna (Virtual Box - Linux, Hyper-V - Windows)
Dysk Lokalny (tylko windows) Dysk D:\

Docker hub io account:
Dockerid: kgadecki
Pass: &Db…

Kontenery/images

Kontener uruchomiony to process w systemie
Image - plik ze zrodlem kontenera

 w systemie mamy docker daemon czyli taki serwer ktory uruchamia imagesy itp
Docker cli - command line interface ktorego emanacja w systemie jest 'docker'
Docker cli komunikuje sie z daemonem wydaja mu polecenia. To jest API Rest'owe do Daemona

File System /var /lib + command


#LAB 2
Docker info - docker system info

IMAGE has file system: /var /lib /bin 
Command ktory jest glownym procesem np echo hello

Exited (0) przy statusie kontenera oznacza, ze dzialalnie kontenera zakonczylo sie bez bledu

Busybox - podobny do alpine ale jeszcze mniejszy
Alpine linux - official docker image. 2,5mb bardzo milimalny obraz linux. Mozna na nim instalowac pakiety (mozna uzywac apt-get)

Docekr run - jesli nie ma image w cache'u lokalnym to go pobiera z docker hub'a

>du -hs .  Disk usage human cos tam wszystko 

Podstawowe komendy vi ! Poznac vi w poziomi podstawowym aby moc sie poruszac
Learn vim game
Ls -iii jedno I male

Docker jak sciaga nowy obraz to sciaga tzw kilka layers czyli takie pomocnicze warstwy obrazu

Docker run redis
Port 6379 to jest port wewnetrznej sieci redisa 
docker exec -it 5f4 redis-cli  odpala clienta command linowego servera redisa

-SIGTERM
-SIGKILL

Docker start -a container_id 

>stdin stout stderr - strumienie w linuksie

#DOCKERFILE
	1. FROM image tworzacej dystrybucji 
	2. DOINSTALOWYWANIE (apkt-get…)
	3. USERZY, PRAWA
	4. CMD

Nginx - server appek


#LAB 3
Nginx - server szybki I powszechnie stosowany server frontendowy
Na pocatku jako serv statycznych plikow
Pozniej jako reverse proxy 

Siec jest izolowana tak jak system plikow itp (w dockerze)
Musimy skonfigurowac siec dla kazdego kontenera

Dystrybucja linux Alpine, mala ale mozna doinstalowyewac pakiety przy apt-get

Travis ci - do budowania (CI)
https://travis-ci.com/dashboard/builds
https://github.com/konradgadecki/devops-frontend-hello/pull/1
Docker build -t kgadecki/my-nginx:latest .

Nodejs do budowy apki
Node:alpine

Express js do web api
Curl - command line tool for transferring data with URLs
>curl http://localhost:8888
>curl -v http://localhost:8888

Docker-compose up --build
Docker-compose ps - odpalamy tam gdize docker-compose-yaml jest


#LAB4
>docker-compose ps
>docker-compose up --build -d
>curl -v http://localhost:9090/
process.exit(0);

>npm test ( w folderze z frontendem reactowym)

>npm run build
The build folder is ready to be deployed.
You may serve it with a static server:

  npm install -g serve
  serve -s build
	- Kopiuje sie katalog ./build do servera statycznego np nginx I tyle

>docker build -f dockerfile.dev .
>docker run -it -p 4000:3000 <image>

http://localhost:9099/
http://localhost:9090/ nginx


#LAB5
Sprawdza ile zajmuje caly katalog
>du -sh . 

Dzisiejsza apka frontent-hello
$ docker run -p 90:80 0cee17bdeafd

 >docker build -f dockerfile.dev .

	#docker network
>docker network
>docker network create demoapp
>docker network ls demoapp

	#poczytaj o docker network bridge!

	#multicontainerdemo-app
>pwd
..\DevOps\devops-frontend-hello\lab5\multicontainerdemo\backend
>npm install 
>docker network create demoapp
>docker run --network demoapp --name my-postgres -e POSTGRES_PASSWORD=1qaz2wsx3edc -d postgres
>docker run --network demoapp --name my-redis redis
>docker stop multicontainerdemo-app
>docker image rm my-backend:latest
>docker build -f dockerfile.dev -t my-backend .
>docker run --network demoapp --env REDIS_HOST=my-redis -e REDIS_PORT=6379 -e REDIS_PORT=6379 --rm --name multicontainerdemo-app -v "node_modules:/opt/app/node_modules" -v "$(pwd):/opt/app" -e PGHOST=my-postgres -e PGUSER=postgres -e PGDATABASE=postgres -e PGPASSWORD=1qaz2wsx3edc -e PGPORT=5432 -p 8080:8080 my-backend

>docker exec -it my-postgres sh // from powershell 
#psql postgres postgres //database user
Postgres=#select * from counter_value;
Postgres=#select * from nwd_value;
>curl http://localhost:8080/?l1=12"&"l2=6


#LAB 6
Volume - bookmarks poczytac
.env - katalog z ktorego brane sa zmienne srodowiskowe (docker-compose.yaml -> environments

>docker exec -it nginx_container sh
#cd etc/nginx/conf.d
#cat default.conf



#LAB 7 kubenetes
https://kubernetes.io/docs/concepts/overview/components/

Trening: https://www.edx.org/course/introduction-to-kubernetes

>kubectl cluster-info
>kubectl config view

Kubernetes pod
https://kubernetes.io/docs/concepts/workloads/pods/pod/
>kubectl get pods
>kubectl get pods --namespace=kube-system

Tworzenie poda z pliku yaml
>kubectl create -f .\pod-template.yaml

Pobiera informacje o podzie
>kubectl describe pod myapp-pod

Ussuwa pod
>kubectl delete pod myapp-pod

Poprawka gdy blad:
>kubectl create -f .\pod-template.yaml
>kubectl describe pod myapp-pod
>kubectl delete pod myapp-pod


Uzywanie replica set


Sprawdz replikasety
>kubectl get rs
>kubectl get all
>kubectl describe replicaset myapp-rs

Kiedy to ma sens? Skalowanie aplikacji, dodawanie nowych kontenerow
Mechanizm serwisow rozprowadza ruch po tych replikach. Losowo, round robin (karuzelowo) itp
Aplikacja musi byc bezstanowa by dalo sie ja skalowac! Stateless app
Aplikacje niemutowalne - obraz nie moze byc mutowalny. Jesli sa parametry config imagu to te parametry do innych bytow konfiguracyjnych przenosic. Jesli sie zmienic np haslo do db to zeby nie zapisywac tego w imagu tylko w przeznaczonym do konfiguracji bytach (konfig mapy)

W jaki sposob mozemy skalowac apke?
>kubectl get rs
>kubectl scale --replicas=5 replicaset myapp-rs

Gdy bedize restart apki to wtedy ustawienia obowiazuja z yamla

Mozna natomiast zmienic plik yaml I uruchomic
 >kubectl replace -f .\rs-template.yaml
>kubeclt get rs
Wtedy pody sie przeladuja 

Deploymenty. Deployment ma zdolnosc zarzadzania wersjami. Wycofywania updatow itp


>kubectl delete rs myapp-rs
>kubectl create -f deployment-template.yaml
>kubectl get deployments
>kubectl get all

https://github.com/konradgadecki/lab-devops


#LAB 8 kubernetes cd
kubectl cluster-info - sprawdza co jest running
kubectl create -f .\nginx-deployment.yaml
kubectl describe deploy my-nginx-deployment
kubectl get pods
kubectl describe pod my-nginx-deployment-77dfbfbd98-gthj8

kubectl create -f .\myapp-service-nodeport.yaml
kubectl get services
kubectl describe svc myapp-service

verification:
kubectl get deploy
kubectl get service
kubectl describe service myapp-service

set up backend:
mkdir mybackend
cd mybackend
npm init -y
npm add express redis uuid

#look
debugging dns resolution

#zadanie
polaczyc backend z redisem I wrzucic do repo dockerowego
I wrzucic na repo 


#LAB 9
kubectl appy -f pvc-definition.yml
kubectl get pvc
kubectl get pv
kubectl get sc (storageclass)
kubectl apply -f test-pvc-deployment.yml
kubectl describe postgres-deployment



kubectl logs postgres-deployment-5d9f6cd5fd-njtcn

kubectl apply -f .\postgres-deployment.yml

kubectl get pvc

kubectl delete deploy postgres-deployment

kubectl describe pod postgres-deployment-5d9f6cd5fd-qlfh6

kubectl get secret


#LAB 10
NGINX Ingress controller - kubernetes.github.io

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
PS C:\Users\koga\Desktop\Private\Studia\Sem 4\DevOps\lab-devops\lab10-ingress> kubectl get namespaces
NAME              STATUS   AGE
default           Active   21d
docker            Active   21d
ingress-nginx     Active   73s
kube-node-lease   Active   21d
kube-public       Active   21d
kube-system       Active   21d
PS C:\Users\koga\Desktop\Private\Studia\Sem 4\DevOps\lab-devops\lab10-ingress> kubectl get pods -n ingress-nginx
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-s99hk        0/1     Completed   0          84s
ingress-nginx-admission-patch-nq2dz         0/1     Completed   0          84s
ingress-nginx-controller-579fddb54f-f574r   1/1     Running     0          94s
PS C:\Users\koga\Desktop\Private\Studia\Sem 4\DevOps\lab-devops\lab10-ingress> kubectl exec -it ingress-nginx-controller-579fddb54f-f574r -n ingress-nginx -- /nginx-ingress-controller --version
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:       0.33.0
  Build:         git-589187c35
  Repository:    https://github.com/kubernetes/ingress-nginx
  nginx version: nginx/1.19.0

-------------------------------------------------------------------------------


#COMMANDS DOCKER

Pokaż różne informacje o Client/Server
>docker system info 

Czyści wszystkie zatrzymane kontenery, nieużywane śmieci
>docker system prune

Podgląd wszystkich kontenerów (uruchomionych i zatrzymanych)
>docker ps -a 

Zatrzymanie kontenera z id 5f4
>docker stop 5f4

Czyści j/w praz images
>docker system prune -a

Uruchamianie image (tworzy kontener) hello-world
>docker run hello-world

 Zapuszcza komende na kontenerze ktory wlasnie uruchamiamy
>docker run image <cmd>

Wchodzi do środka kontenera busybox
>docker exec -it busybox_container_id sh

Odpala clienta command linowego servera redisa
>docker exec -it 5f4 redis-cli  

Tworzy image z dockerfile
>docker build -t name .

Wrzuca utworzony image na repo hub.docker.com
>docker push kgadecki/mybbox:latest

Uruchamia image nginx, mapuje port hosta (local) 9090 na ten z kontenera 80. Wtedy z localhost z przegladarki można localhost:9090 
>docker run -p 9090:80 nginx

Wchodzenie do kontenera 5f4 (redis) z komenda redis-cli 
>docker exec -it 5f4 redis-cli
Komendy redis
>set message hello
>get message
>exit

Tworzenie image o nazwie 
>docker build -t hello-world-busybox:latest

Uruchamianie obrazu o nazwie hello-world-busybox:latest
>docker run hello-world-busybox:latest

Po uprzednim sworzeniu pliku dockerfile, tworzenie z niego obrazu
>docker build -t kgadecki/mybbox:latest .

Listowanie wszystkich dostępnych lokalnie obrazów
>docker image ls

Wrzucanie uprzednio utworzonego obrazu na repo hub.docker.com (trzeba się zalogowac lokalnie na swoje konto docker)
>docker push kgadecki/mybbox:latest

pokazuje ile poszczegolny kontener pobiera zasobow
>docker stats

#Kubernetes
- status
kubectl cluster-info

- config
kubectl config view

- list pods
kubectl get pods

- list system pods
kubectl get pods --namespace=kube-system

- create pod
kubectl create -f [pod-file.yml]

- pod details
kubectl describe pod [pod_name]

- delete pod
kubectl delete pod [pod_name]

- describe replicaset (rs)
kubectl describe rs [rs_name]

- get all
kubectl get all

- scale replicaset
kubectl scale --replicas=5 rs [rs_name]

- scale replicaset by file
kubectl scale --replicas=5 -f [rs_file.yml]

- replace yml
kubeclt replace -f [yml_file.yml]

- delete replicaset
kubectl delete rs [rs_name]

- get deployments
kubectl get deployments

- delete deployment
kubectl delete deployment [deployment_name]



