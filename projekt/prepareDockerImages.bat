cd backend
docker build -t kgadecki/mybackend .
docker push kgadecki/mybackend
cd ../

cd frontend
docker build -t kgadecki/myfrontend .
docker push kgadecki/myfrontend
cd ../
