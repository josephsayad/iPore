# iPore

[![Status](https://img.shields.io/pypi/status/Django.svg)]() [![React Native](https://img.shields.io/badge/react%20native-0.42.0-brightgreen.svg)](https://facebook.github.io/react-native/) [![Node.js](https://img.shields.io/badge/node-8.5.0-brightgreen.svg)](https://nodejs.org/en/) [![Docker](https://img.shields.io/badge/docker-17.06.2-blue.svg)](https://www.docker.com/)

A React Native mobile application used to work with nanopore sequencing data from Oxford Nanopore. This application is stable on Mac OS X. 

## Requirements

* [Homebrew](https://docs.brew.sh/Installation.html)
* Xcode
* [Node.js](https://changelog.com/posts/install-node-js-with-homebrew-on-os-x)
* [React Native (0.42.0)](https://facebook.github.io/react-native/docs/getting-started.html)
* [MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)
* [Docker](https://www.docker.com/docker-mac)
* [Python](https://docs.brew.sh/Homebrew-and-Python.html)

## Execution structure

#### Pull & install node modules

```
git pull https://github.com/josephsayad/iPore.git
cd iPore/mobile/ && npm install
cd ../server/ && npm install
```

#### Pull Docker images, start MongoDB & web servers

```
cd ../ && bash exe.bash
cd server/ && sudo nodemon
```

#### Run React Native app

```
cd ../mobile/ && react-native run-ios
```

## Functionality

After successfully running the React Native application, you can take the following actions: 

1. Registering a User: This adds you to the userschema collection in MongoDB. 
2. Authenticating a User: After your password is authenticated with the bcryptjs module, you are routed to the iPore dashboard. 
3. Pipeline create: Run the pipeline - it processes test data available in the FAST5 directory. To run your own test data through the bioinformatics pipeline, remove the test data, and add your own FAST5 data in this directory. You can index 1 of 9 bacterial reference genomes with the LAST aligner. 
4. PipeListItem view: You can view the results of the pipeline on the application by pressing on list items (with a given run ID) in the dashboard. You will need to refresh the app after the pipeline is complete (check nodemon terminal for pipeline completion status). 

## Upcoming updates 

1. Implement loading bar in react native application.
2. Upon pipeline completion, the mobile application should automatically refresh.
3. Machine running the server will send its IP to the mobile application so that data processing is not limited to one's local machine/local host. 

## Credits

The open source tools used to analyze nanopore sequencing data in this project include: [Poretools](https://github.com/arq5x/poretools), [NanoOK](https://github.com/TGAC/NanoOK), and [Maftools](https://github.com/PoisonAlien/maftools). Test data used in this project was pulled from the [NanoOK tutorial page](https://documentation.tgac.ac.uk/display/NANOOK/NanoOK+tutorial).
