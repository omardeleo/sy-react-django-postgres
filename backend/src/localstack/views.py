import uuid

import localstack_client.session

from django.shortcuts import render
from django.shortcuts import redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.staticfiles.storage import staticfiles_storage
import datetime

BUCKET = 'test-bucket'


def s3_client():
    return localstack_client.session.Session().client('s3')


def index(request):
    s3_client().create_bucket(Bucket=BUCKET)
    return JsonResponse(s3_client().list_objects(Bucket=BUCKET))


def create(request):
    s3_client().put_object(Bucket=BUCKET,
                           Key='{}.txt'.format(uuid.uuid1()),
                           Body=b'some content')
    return redirect('index')


def upload(request):
    if request.method == 'POST' and request.files['file']:
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            s3_client().put_object(Bucket=BUCKET,
                                   Key=filename,
                                   Body=file)

    return JsonResponse({"message": filename })