#!/bin/bash

nodeServer=$(pwd)'/node-server'
pipeline=$nodeServer'/nanopore/pipeline'
userOutput=$pipeline'/userOutput'

# Pull Docker images from Docker Hub

docker pull josephsayad/ipore:poretools
docker pull josephsayad/ipore:nanook
docker pull josephsayad/ipore:maftools

# Start MongoDB and SimpleHTTPServer

npm install -g nodemon
brew tap gapple/services

osascript -e 'tell app "Terminal" to do script "
  brew services start mongodb
"'

cd $userOutput && python -m SimpleHTTPServer 3001
chmod -R 777 $nodeServer
