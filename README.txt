***README***
any folders with package.json, run npm install
any folders with bower.json, run bower install

Chapters 8 and 9 are a little complicated in their use. The chapter will cover what you need to do, but here is a nice list of what to do.

Chapter 8 steps
* npm install and bower install
* create a dev_secret.env
* source dev.env and dev_secret.env
* run grunt
* start node

Chapter 9 steps
* npm install and bower install
* virtualenv venv
* source venv/bin/activate
* pip install -r dev-requirements.txt
* get credentials for Facebook, Google, and Amazon Web Services and add them to the secret file
* check STATIC_URL and AWS_BUCKET in prod.env are set to your S3 bucket
* update ansible/vars.yml to use your git repo
* create Amazon EC2 instances with the correct tags; Redis:Role, RabbitMQ:Role, HAProxy:Role, Chat:Deploy, Worker:Deploy, prod:Env
* source prod.env and prod_secret.env
* ssh-add ~/your_aws_key
* run ./deploy.sh site.yml prod master
* browse to your Amazon EC2 IP address