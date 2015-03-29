import boto
import os

from boto.s3.key import Key

root_dir = './static/'


def upload(file_name):
    k = Key(bucket)
    k.key = file_name
    k.set_contents_from_filename(root_dir + file_name)
    print 'Uploading %s' % root_dir + file_name


def walk(directory):
    for (source, dirs, files) in os.walk(directory):
        #remove first directory
        d = source.replace(directory, '')
        for file in files:
            if (file != '.DS_Store'):
                file_list.append(d + '/' + file)
        map(walk, dirs)


def clean_js():
    for key in bucket.list(prefix='js/'):
        key.delete()

conn = boto.connect_s3()

#the AWS keys are in the env
bucket = conn.get_bucket(os.environ['AWS_BUCKET'])

clean_js()
file_list = []
walk(root_dir)
map(upload, file_list)