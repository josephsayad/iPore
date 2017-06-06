#!/bin/bash

# Set directory paths.

pathToPipeline=$(pwd)'/nanopore/nextflow-pipeline';
pathToJobsWorking=$pathToPipeline'/jobs-working';
pathToScripts=$pathToPipeline'/scripts';
pathToReferenceDir=$pathToJobsWorking/'inputs/nanook/reference';
pathToNextflowConfig=$pathToPipeline'/scripts/nextflow.config';
pathToNextflowScript=$pathToPipeline'/scripts/main.nf';

# Set arguments of script to variables.

userID=$1;
pipelineName=$2;
fast5Path=$3; # files to be placed in NanoporeSeq/Server/FAST5/
referenceFilePath=$4; # assuming there is one reference file.

echo "";
echo "*--------------------------------------------------------*";
echo "* Pipeline Detail ---------------------------------------*";
echo "";
echo "user ****** "$userID;
echo "pipeline ** "$pipelineName;
echo "fast5 ***** "$fast5Path;
echo "reference * "$referenceFilePath;
echo "";
echo "*--------------------------------------------------------*";
echo "*--------------------------------------------------------*";
echo "";

# Copy reference file from path to reference directory. 

cp $referenceFilePath $pathToReferenceDir # constant number of files. 

# Adjust nextflow.config file during run-time.

##### Process Docker plug-in #####

poretoolsContainer='bcil/galaxy:poretools';
nanookContainer='bcil/galaxy:nanook';
maftoolsContainer='bcil/galaxy:maftools';

##### Grab location of Fast5 reads from user input #####

mountFlag='-v';
firstParameter=$pathToJobsWorking':/home/data';
secondParameter=$fast5Path':/home/fast5';
runOptions='runOptions = '\'$mountFlag' '$firstParameter' '$mountFlag' '$secondParameter\';

##### Write to nextflow configuration file #####

echo "process."\$"runPoretools.container = "\'$poretoolsContainer\' >> $pathToNextflowConfig;
echo "process."\$"runNanook.container = "\'$nanookContainer\' >> $pathToNextflowConfig;
echo "process."\$"runMaftools.container = "\'$maftoolsContainer\' >> $pathToNextflowConfig;

echo "" >> $pathToNextflowConfig;
echo "docker {" >> $pathToNextflowConfig;
echo "	enabled = true" >> $pathToNextflowConfig;
echo " "$runOptions >> $pathToNextflowConfig;
echo "}" >> $pathToNextflowConfig;

echo '' >> $pathToNextflowConfig;
echo "timeline {" >> $pathToNextflowConfig;
echo "	enabled = true" >> $pathToNextflowConfig;
echo "}" >> $pathToNextflowConfig;

# Run Nanopore Seq Pipeline.

nextflow run $pathToNextflowScript;

# Clean-up nextflow work directory, logs, reference file, and config file.

sudo chmod 777 -R work;
sudo chmod 777 $pathToNextflowConfig;
sudo chmod 777 .nextflow;
sudo chmod 777 .nextflow.log;
sudo chmod 777 .nextflow.log.1;
sudo chmod 777 .nextflow.log.2;
sudo chmod 777 timeline.html;

rm -rf work;
rm -rf .nextflow;
rm .nextflow.log;
rm .nextflow.log.1;
rm .nextflow.log.2;
rm timeline.html;
rm -rf $pathToReferenceDir/*; # clean ref directory.
rm $pathToNextflowConfig;

touch $pathToNextflowConfig;

rm $fast5Path/fast5 # delete broken symlink.

# Setup Nanopore Seq Pipeline Output.

setupUserOutput='sh ./nanopore/bash/setupUserOutput.sh ';
$setupUserOutput $userID $pipelineName;

# Populate MongoDB with Nanopore Seq Pipeline Output.

postUserOutput='./nanopore/js/populate.js';
userRunOutputPath=$pathToPipeline'/userOutput/'$userID;

node $postUserOutput $userID $userRunOutputPath $pipelineName;
