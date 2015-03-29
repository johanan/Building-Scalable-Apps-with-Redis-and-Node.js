#!/bin/bash

source ./set_env.sh $1

./node_modules/.bin/grunt

virtualenv venv
source venv/bin/activate
pip install -r requirements.txt

python static.py
deactivate
