#!/bin/bash

if [[ $# -ne 3 ]]; then
  echo "Please pass in the plabook, environment, and git branch"
  exit 1
fi

source $2_secret.env

source venv/bin/activate

cd ansible

ansible-playbook -i ec2.py $1 --limit tag_$2_Env --extra-vars "deploy_env=$2 branch=$3"

if [ $? -ne 0 ]; then
  echo "Did you remeber to add the SSH key with ssh-add? Do you have an $2_secret.env file with the AWS credentials? Are the instances tagged with tag_$2_Env?"
fi
