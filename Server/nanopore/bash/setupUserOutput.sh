#!/bin/bash

# Set directory paths.

pathToPipeline=$(pwd)'/nanopore/nextflow-pipeline';
pathToJobsWorking=$pathToPipeline'/jobs-working';
pathToPoretools=$pathToJobsWorking'/outputs/poretools';
pathToNanook=$pathToJobsWorking'/outputs/nanook';
pathToMaftools=$pathToJobsWorking'/outputs/maftools';
pathToOutput=$pathToPipeline'/userOutput';

# Set argument of script to variable.

userID=$1;
pipelineName=$2;

# Make user directory and set-up run directory.

userDir=$pathToOutput'/'$userID;
runDir=$pathToOutput'/'$userID'/'$pipelineName;
poretoolsOutput=$runDir'/poretools';
nanookOutputs=$runDir'/nanook';
maftoolsOutputs=$runDir'/maftools';

mkdir -p $userDir;
mkdir $runDir;

##### Directory for each tool #####

mkdir $poretoolsOutput;
mkdir $nanookOutputs;
mkdir $maftoolsOutputs;

quality_check=$nanookOutputs'/quality_check';
analysis=$nanookOutputs'/analysis';
alignment_files=$nanookOutputs'/alignment_files';

mkdir $quality_check;
mkdir $analysis;
mkdir $alignment_files;

##### Move contents of jobs-working to userOutput #####

mv $pathToPoretools/* $poretoolsOutput;
mv $pathToNanook/latex_last_passonly/* $quality_check;
mv $pathToNanook/analysis_last_passonly/* $analysis;
mv $pathToNanook/last/pass/* $alignment_files;
mv $pathToMaftools/* $maftoolsOutputs;

##### Clean-up jobs-working for next run #####

rm -rf $pathToPoretools/*
rm -rf $pathToNanook/*
rm -rf $pathToMaftools/*