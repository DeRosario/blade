## MAIN BACKEND BUILD
echo '#################### BUILD BLADE API ###################'
cd ../backend
npm install
npm run tsc
cp ./package.json ../build/
cp -R ./app/keys ../build/app/keys
cd ../build
npm install

## MAIN FRONTEND BUILD
echo '#################### BUILD FRONTEND ###################'
cd ../frontend
npm install
ng build --prod

##############
### IMAGES ###
##############

## BUILD BLADE DB IMAGE
echo '###################### BUILD BLADE DB IMAGE ##############'
cd ../docker/database/
docker build -t blade-db-image .

## BUILD BLADE API IMAGE
echo '###################### BUILD BLADE API IMAGE ##############'
cd ../../build/
docker build -t blade-api-image -f ../docker/blade-api/Dockerfile .

## CREATE BLADE NETWORK
echo '################ CREATE BLADE NETWORK ##################'
docker network create blade-network

##################
### CONTAINERS ###
##################

## CREATE MAESTRO DB CONTAINER
echo '############### RUN BLADE DB CONTAINER ####################'
docker container run -d --restart unless-stopped --name blade-db-container --network blade-network blade-db-image

## CREATE MAESTRO API CONTAINER
echo '############## RUN BLADE API CONTAINER ################'
docker container run -d --restart unless-stopped -p 5099:5099 --name blade-api-container --network blade-network blade-api-image
