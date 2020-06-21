
docker build -t blade-db-image .
docker container rm -f dev-blade-db-container
docker container run -d --restart unless-stopped -p 27200:27017 --name dev-blade-db-container --network blade-network blade-db-image



docker build -t dev-blade-api-image -f ../docker/dev-blade-api/Dockerfile .
docker container rm -f dev-blade-api-container
docker container run -td --restart unless-stopped -p 5099:5099 --name dev-blade-api-container --network blade-network -v /mnt/hgfs/Example/build/:/blade dev-blade-api-image
