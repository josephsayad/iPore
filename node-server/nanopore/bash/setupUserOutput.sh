#!/bin/bash

# Set directory paths

currDir=$(pwd)
server=${currDir%/nanopore/bash}
pipeline=$server'/nanopore/pipeline'
jobsWorking=$pipeline'/jobs-working'
poretoolsOutput=$jobsWorking'/outputs/poretools'
nanookOutput=$jobsWorking'/outputs/nanook'
maftoolsOutput=$jobsWorking'/outputs/maftools'
userOutput=$pipeline'/userOutput'

# Set arguments of script to variables

userID=$1
pipelineName=$2

# Make user directory and set-up run directory.

userDir=$userOutput'/'$userID
runDir=$userOutput'/'$userID'/'$pipelineName
poretools=$runDir'/poretools'
nanook=$runDir'/nanook'
maftools=$runDir'/maftools'

mkdir -p $userDir $runDir

# Directory for each tool 

mkdir $poretools $nanook $maftools

quality_check=$nanook'/quality_check'
analysis=$nanook'/analysis'
alignment_files=$nanook'/alignment_files'

mkdir $quality_check $analysis $alignment_files

# Move jobs-working output to userOutput 

mv $poretoolsOutput/* $poretools
mv $nanookOutput/latex_last_passfail/* $quality_check
mv $nanookOutput/analysis_last_passfail/* $analysis
mv $nanookOutput/last/pass/* $alignment_files
mv $maftoolsOutput/* $maftools

# Set permissions 

chmod -R 777 $userOutput
