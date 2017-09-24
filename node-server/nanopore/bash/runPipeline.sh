#!/bin/bash

# Setup directory paths

currDir=$(pwd)
server=${currDir%/nanopore/bash}
nanopore=$server'/nanopore'
pipeline=$server'/nanopore/pipeline'
jobsWorking=$pipeline'/jobs-working'
referenceDir=$jobsWorking/'inputs/nanook/reference'
inputDataset=$server'/FAST5'

# Set arguments of script to variables

userID=$1
pipelineName=$2
fast5Path=$3
referenceFilePath=$4

# Set up internal jobs working directories & user-picked reference file

mkdir -p $jobsWorking'/inputs' $jobsWorking'/outputs'
mkdir -p $jobsWorking'/inputs/poretools' $jobsWorking'/outputs/poretools'
mkdir -p $jobsWorking'/inputs/nanook' $jobsWorking'/outputs/nanook'
mkdir -p $jobsWorking'/inputs/nanook/main' $jobsWorking'/inputs/nanook/main/fast5' $jobsWorking'/inputs/nanook/reference'
mkdir -p $jobsWorking'/inputs/maftools' $jobsWorking'/outputs/maftools'

cp $referenceFilePath $referenceDir

# Detail 

printf '\n[Pipeline Detail]\nuser : '$userID'\nrun ID : '$pipelineName
printf '\ndataset : '$fast5Path'\nreference : '$referenceFilePath'\n'

# Define docker containers with tools installed

poretools='josephsayad/ipore:poretools'
nanook='josephsayad/ipore:nanook'
maftools='josephsayad/ipore:maftools'

# Generate fast5 visualization: Poretools

printf "\n[Running Poretools]\n"

docker run --name poretools -v $jobsWorking:/home/data/ -v $inputDataset:/home/fast5/ -td $poretools
docker exec -t poretools sh /home/exe.sh

# # Generate PDF: NanoOK

printf "\n[Running Nanook]\n"

docker run --name nanook -v $jobsWorking:/home/data/ -v $inputDataset:/home/fast5/ -td $nanook
docker exec -t nanook sh /home/exe.sh

# Generate MAF files: Maftools

printf "\n[Running Nanook]\n"

docker run --name maftools -v $jobsWorking:/home/data/ -v $inputDataset:/home/fast5/ -td $maftools
docker exec -t maftools bash /home/exe.bash

# Stop & remove containers via name 

docker stop poretools nanook maftools
docker rm poretools nanook maftools

# Set-up user output

sh $nanopore'/bash/setupUserOutput.sh' $userID $pipelineName

# Clean jobs-working NanoOK

chmod -R 777 $jobsWorking 
rm $referenceFilePath
rm -r $jobsWorking'/outputs/nanook/*'

# Populate MongoDB with output data 

node $nanopore'/js/populate.js' $userID $pipeline'/userOutput/'$userID $pipelineName

