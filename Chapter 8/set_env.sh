#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Please pass in the environment as the first argument"
  exit 1
fi

source ./$1.env
source ./$1_secret.env

if [ $? != 0 ]; then
  echo "Create the needed environment files"
  exit $?
fi
