#!/bin/bash

nodeServer=$(pwd)'/node-server'
pipeline=$nodeServer'/nanopore/pipeline'
userOutput=$pipeline'/userOutput'

# Pull Docker images from Docker Hub

docker pull josephsayad/ipore:poretools
docker pull josephsayad/ipore:nanook
docker pull josephsayad/ipore:maftools

# Install nodemon, and services.

npm install -g nodemon
brew tap gapple/services

# Start MongoDB and SimpleHTTPServer
# if already started, run: brew services restart mongodb

osascript -e 'tell app "Terminal" to do script "
  brew services start mongodb
"' 

mkdir -p $pipeline $userOutput
cd $userOutput && python2 -m SimpleHTTPServer 3001
