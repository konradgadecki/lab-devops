
# run the project

1. open powershell with admin rights
2. execute prepareDockerImages.bat to build and push to the docker hub images 
3. execute startup.bat to start up the project 

# restart the project

1. open powershell with admin rights
2. execute shutdown.bat
3. execute startup.bat

# update backend/frontend

1. open powershell with admin rights
2. execute prepareDockerImages.bat
2. execute shutdown.bat
3. execute startup.bat

# How to use try out?
##Frontend
 is exposed in to ways: through Ingress and NodePort.
To access it via Ingress, browse: https://localhost
To access it bypassing Ingreess, browse: http://localhost:30009

##Backend
 is exposed through default type of kube service: ClusterIP
meaning it is not visible from outside of the cluster directly
It is possible though to reach it using Ingress, browsing: https://localhost/api

##Ingress
acts as a “smart router” or entrypoint into your cluster. In default configuration Ingress works as a Load Balancer 