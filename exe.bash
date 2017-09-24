#!/bin/bash

userOutput=$(pwd)'/server/nanopore/pipeline/userOutput'

# Docker Pull 

docker pull josephsayad/ipore:poretools
docker pull josephsayad/ipore:nanook
docker pull josephsayad/ipore:maftools

# Run MongoDB and SimpleHTTPServer

npm install -g nodemon
brew tap gapple/services

osascript -e 'tell app "Terminal" to do script "
  brew services start mongodb
"'

cd $userOutput && python -m SimpleHTTPServer 3001
